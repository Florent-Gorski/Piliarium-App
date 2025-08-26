import React, { useState, useEffect, useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, BookOpen, Map, BarChart2, Briefcase, HelpCircle, Shield, Moon, Sun, Menu, X, ArrowLeft, Repeat } from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---
interface Provider {
  nom: string;
  type: 'Assurance' | 'Banque';
  fraisInitiaux: number;
  fraisGestion: number;
  valeurRachatA3: number;
  rendementNet5ans: number;
  garantieDeces: string;
  flexibilite: number;
  redFlags: string[];
}

interface Quiz {
  title: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explication: string;
  }[];
}

interface SectionMeta {
  title: string;
  component: React.ReactNode;
  icon: React.ElementType;
}

// --- DONNÉES DE BASE (CONFORMES 2025) ---
const PLAFONDS_2025 = {
  salarie: 7258,
  independant: 36288
};

const CANTONS_DATA: Record<string, { nom: string; echelonnement: number; tauxMarginal: number; particularites: string; }> = {
  VD: { nom: "Vaud", echelonnement: 3, tauxMarginal: 42, particularites: "Max 3 ans échelonnement pour lisser l'impôt." },
  GE: { nom: "Genève", echelonnement: 3, tauxMarginal: 45, particularites: "3b partiellement déductible sous conditions." },
  VS: { nom: "Valais", echelonnement: 5, tauxMarginal: 38, particularites: "Fiscalité globalement avantageuse au retrait." },
  FR: { nom: "Fribourg", echelonnement: 1, tauxMarginal: 40, particularites: "3b déductible sous conditions strictes." },
  NE: { nom: "Neuchâtel", echelonnement: 1, tauxMarginal: 43, particularites: "Taux unique au retrait, parfois avantageux." },
  JU: { nom: "Jura", echelonnement: 1, tauxMarginal: 41, particularites: "Barème progressif modéré." }
};

const PROVIDERS_DATA: Provider[] = [
  // === ASSURANCES ===
  { nom: "Allianz Suisse", type: "Assurance", fraisInitiaux: 2.9, fraisGestion: 1.1, valeurRachatA3: 87, rendementNet5ans: 3.7, garantieDeces: "Moyenne", flexibilite: 8, redFlags: ["Performance volatile"] },
  { nom: "Assura", type: "Assurance", fraisInitiaux: 2.5, fraisGestion: 1.2, valeurRachatA3: 88, rendementNet5ans: 3.4, garantieDeces: "Basique", flexibilite: 7, redFlags: ["Focalisé sur l'assurance maladie"] },
  { nom: "AXA", type: "Assurance", fraisInitiaux: 2.8, fraisGestion: 1.1, valeurRachatA3: 88, rendementNet5ans: 3.9, garantieDeces: "Élevée", flexibilite: 8, redFlags: ["Exclusions santé"] },
  { nom: "Bâloise", type: "Assurance", fraisInitiaux: 3.0, fraisGestion: 1.2, valeurRachatA3: 86, rendementNet5ans: 3.8, garantieDeces: "Élevée", flexibilite: 7, redFlags: ["Frais de transfert"] },
  { nom: "Concordia", type: "Assurance", fraisInitiaux: 2.6, fraisGestion: 1.1, valeurRachatA3: 89, rendementNet5ans: 3.5, garantieDeces: "Moyenne", flexibilite: 7, redFlags: [] },
  { nom: "CSS Assurance", type: "Assurance", fraisInitiaux: 2.4, fraisGestion: 1.0, valeurRachatA3: 89, rendementNet5ans: 3.5, garantieDeces: "Moyenne", flexibilite: 7, redFlags: [] },
  { nom: "Generali", type: "Assurance", fraisInitiaux: 3.8, fraisGestion: 1.4, valeurRachatA3: 80, rendementNet5ans: 4.3, garantieDeces: "Moyenne", flexibilite: 5, redFlags: ["Frais acquisition très élevés", "Rachat pénalisé"] },
  { nom: "Groupe Mutuel", type: "Assurance", fraisInitiaux: 2.7, fraisGestion: 1.15, valeurRachatA3: 88, rendementNet5ans: 3.6, garantieDeces: "Moyenne", flexibilite: 7, redFlags: [] },
  { nom: "Helsana", type: "Assurance", fraisInitiaux: 2.5, fraisGestion: 1.1, valeurRachatA3: 88, rendementNet5ans: 3.6, garantieDeces: "Moyenne", flexibilite: 7, redFlags: [] },
  { nom: "Helvetia", type: "Assurance", fraisInitiaux: 2.5, fraisGestion: 1.0, valeurRachatA3: 90, rendementNet5ans: 4.0, garantieDeces: "Moyenne", flexibilite: 9, redFlags: [] },
  { nom: "La Mobilière", type: "Assurance", fraisInitiaux: 2.2, fraisGestion: 0.9, valeurRachatA3: 92, rendementNet5ans: 3.6, garantieDeces: "Élevée", flexibilite: 9, redFlags: [] },
  { nom: "Pax Assurances", type: "Assurance", fraisInitiaux: 2.6, fraisGestion: 1.05, valeurRachatA3: 89, rendementNet5ans: 3.8, garantieDeces: "Élevée", flexibilite: 8, redFlags: [] },
  { nom: "Swiss Life", type: "Assurance", fraisInitiaux: 3.5, fraisGestion: 1.2, valeurRachatA3: 85, rendementNet5ans: 4.2, garantieDeces: "Élevée", flexibilite: 7, redFlags: ["Frais acquisition élevés"] },
  { nom: "Swica", type: "Assurance", fraisInitiaux: 2.4, fraisGestion: 1.0, valeurRachatA3: 90, rendementNet5ans: 3.7, garantieDeces: "Moyenne", flexibilite: 8, redFlags: [] },
  { nom: "Vaudoise Assurances", type: "Assurance", fraisInitiaux: 2.3, fraisGestion: 0.95, valeurRachatA3: 91, rendementNet5ans: 3.7, garantieDeces: "Élevée", flexibilite: 9, redFlags: [] },
  { nom: "Visana", type: "Assurance", fraisInitiaux: 2.6, fraisGestion: 1.1, valeurRachatA3: 88, rendementNet5ans: 3.5, garantieDeces: "Moyenne", flexibilite: 7, redFlags: [] },
  { nom: "Zurich Assurances", type: "Assurance", fraisInitiaux: 3.2, fraisGestion: 1.3, valeurRachatA3: 82, rendementNet5ans: 4.1, garantieDeces: "Élevée", flexibilite: 6, redFlags: ["Rachat limité 5 ans"] },

  // === BANQUES & PLATEFORMES DIGITALES ===
  { nom: "BancaStato", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.7, valeurRachatA3: 100, rendementNet5ans: 4.2, garantieDeces: "N/A", flexibilite: 9, redFlags: [] },
  { nom: "Banque CIC (Suisse)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.8, valeurRachatA3: 100, rendementNet5ans: 4.2, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: [] },
  { nom: "Banque du Léman", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.85, valeurRachatA3: 100, rendementNet5ans: 4.1, garantieDeces: "Optionnelle", flexibilite: 8, redFlags: [] },
  { nom: "BCF (Fribourg)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.65, valeurRachatA3: 100, rendementNet5ans: 4.1, garantieDeces: "N/A", flexibilite: 10, redFlags: [] },
  { nom: "BCGE (Genève)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.7, valeurRachatA3: 100, rendementNet5ans: 4.3, garantieDeces: "Optionnelle", flexibilite: 10, redFlags: [] },
  { nom: "BCJ (Jura)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.7, valeurRachatA3: 100, rendementNet5ans: 4.0, garantieDeces: "N/A", flexibilite: 9, redFlags: [] },
  { nom: "BCN (Neuchâtel)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.75, valeurRachatA3: 100, rendementNet5ans: 4.0, garantieDeces: "N/A", flexibilite: 9, redFlags: [] },
  { nom: "BCV (Vaud)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.6, valeurRachatA3: 100, rendementNet5ans: 4.5, garantieDeces: "Optionnelle", flexibilite: 10, redFlags: [] },
  { nom: "BCVS (Valais)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.55, valeurRachatA3: 100, rendementNet5ans: 4.6, garantieDeces: "Optionnelle", flexibilite: 10, redFlags: ["Fonds limités"] },
  { nom: "Crédit Agricole next bank", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.75, valeurRachatA3: 100, rendementNet5ans: 4.2, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: [] },
  { nom: "Crédit Suisse", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.85, valeurRachatA3: 100, rendementNet5ans: 4.2, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: [] },
  { nom: "Finpension", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.39, valeurRachatA3: 100, rendementNet5ans: 5.0, garantieDeces: "N/A", flexibilite: 10, redFlags: ["Solution 100% en ligne"] },
  { nom: "Lombard Odier", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.95, valeurRachatA3: 100, rendementNet5ans: 4.8, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: ["Ticket d'entrée élevé"] },
  { nom: "Migros Bank", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.5, valeurRachatA3: 100, rendementNet5ans: 4.4, garantieDeces: "N/A", flexibilite: 9, redFlags: [] },
  { nom: "Mirabaud", type: "Banque", fraisInitiaux: 0, fraisGestion: 1.0, valeurRachatA3: 100, rendementNet5ans: 4.7, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: ["Gestion de fortune, ticket d'entrée élevé"] },
  { nom: "Pictet", type: "Banque", fraisInitiaux: 0, fraisGestion: 1.0, valeurRachatA3: 100, rendementNet5ans: 4.9, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: ["Ticket d'entrée élevé"] },
  { nom: "PostFinance", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.9, valeurRachatA3: 100, rendementNet5ans: 3.9, garantieDeces: "N/A", flexibilite: 8, redFlags: ["Peu de fonds actifs"] },
  { nom: "Raiffeisen", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.7, valeurRachatA3: 100, rendementNet5ans: 4.3, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: [] },
  { nom: "Swissquote", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.6, valeurRachatA3: 100, rendementNet5ans: 4.7, garantieDeces: "N/A", flexibilite: 10, redFlags: ["Pour clients à l'aise avec le digital"] },
  { nom: "True Wealth", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.5, valeurRachatA3: 100, rendementNet5ans: 4.9, garantieDeces: "N/A", flexibilite: 10, redFlags: ["Solution 100% en ligne"] },
  { nom: "UBS", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.8, valeurRachatA3: 100, rendementNet5ans: 4.4, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: [] },
  { nom: "Valiant", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.75, valeurRachatA3: 100, rendementNet5ans: 4.1, garantieDeces: "Optionnelle", flexibilite: 8, redFlags: [] },
  { nom: "VIAC (via WIR)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.44, valeurRachatA3: 100, rendementNet5ans: 5.1, garantieDeces: "Optionnelle", flexibilite: 10, redFlags: ["Solution 100% en ligne"] },
  { nom: "ZKB (active en Romandie)", type: "Banque", fraisInitiaux: 0, fraisGestion: 0.55, valeurRachatA3: 100, rendementNet5ans: 4.8, garantieDeces: "Optionnelle", flexibilite: 9, redFlags: [] },
];

const ALL_QUIZZES: Record<string, Quiz> = {
  fondamentaux: {
    title: "Fondamentaux du 3e Pilier",
    questions: [
      { id: 1, question: "Quel est le plafond 3a 2025 pour un salarié ?", options: ["6'883 CHF", "7'258 CHF", "Variable selon le revenu", "36'288 CHF"], correct: 1, explication: "Le plafond 3a pour les salariés est fixe à 7'258 CHF en 2025." },
      { id: 2, question: "Lequel de ces motifs N'EST PAS une exception de retrait anticipé 3a ?", options: ["Achat d'un logement principal", "Création d'une entreprise", "Achat d'une voiture de luxe", "Départ définitif de Suisse"], correct: 2, explication: "L'achat de biens de consommation comme une voiture n'est pas un motif de retrait anticipé autorisé." },
      { id: 3, question: "Quelle est la principale caractéristique du pilier 3b ?", options: ["Déduction fiscale maximale", "Flexibilité et liberté contractuelle", "Blocage des fonds jusqu'à 65 ans", "Plafond de versement annuel"], correct: 1, explication: "Le pilier 3b est connu pour sa grande flexibilité, sans plafond de versement légal et avec des conditions de rachat libres." },
    ]
  },
  fiscalite: {
    title: "Fiscalité & Cantons",
    questions: [
      { id: 1, question: "Dans quel canton l'échelonnement du retrait 3a est-il possible sur 5 ans ?", options: ["Vaud (VD)", "Genève (GE)", "Valais (VS)", "Neuchâtel (NE)"], correct: 2, explication: "Le Valais (VS) est l'un des cantons qui autorise un échelonnement plus long, jusqu'à 5 ans." },
      { id: 2, question: "Pourquoi est-il fiscalement judicieux d'ouvrir plusieurs comptes 3a ?", options: ["Pour diversifier les banques", "Pour échelonner les retraits et réduire l'impôt progressif", "Pour obtenir de meilleurs taux d'intérêt", "C'est une obligation légale"], correct: 1, explication: "Retirer plusieurs comptes sur des années différentes permet de lisser les revenus et de réduire l'impact de la progressivité de l'impôt sur le capital." },
      { id: 3, question: "Dans quel canton le pilier 3b peut-il être partiellement déductible ?", options: ["Zurich (ZH)", "Berne (BE)", "Genève (GE)", "Tessin (TI)"], correct: 2, explication: "Genève (GE) et Fribourg (FR) offrent, sous conditions, des déductions pour certaines formes de prévoyance 3b." },
    ]
  },
  produits: {
    title: "Produits & Red Flags",
    questions: [
      { id: 1, question: "Quel est le principal inconvénient d'une assurance 3a par rapport à une banque 3a ?", options: ["Rendement toujours plus faible", "Frais d'acquisition élevés et faible valeur de rachat au début", "Moins de sécurité", "Pas de déduction fiscale"], correct: 1, explication: "Les assurances 3a incluent souvent des frais d'acquisition qui amputent la valeur de rachat les premières années, les rendant peu flexibles." },
      { id: 2, question: "Un 'red flag' majeur dans une offre 3a est...", options: ["Des frais de gestion de 0.5%", "Une valeur de rachat de 100% dès la 1ère année", "Des performances brutes mises en avant", "Une garantie décès incluse"], correct: 2, explication: "Les performances brutes ne tiennent pas compte des frais. Un conseiller doit toujours se baser sur le rendement net pour être transparent." },
      { id: 3, question: "Que signifie 'KYC' dans le jargon financier ?", options: ["Keep Your Capital", "Know Your Customer", "Key Yield Calculation", "Aucune de ces réponses"], correct: 1, explication: "'Know Your Customer' (Connaître son client) est une obligation légale pour les intermédiaires financiers de vérifier l'identité et le profil de risque de leurs clients." },
    ]
  }
};

// --- COMPOSANTS ---

const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', ...props }) => (
  <div {...props} className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode; icon: React.ReactNode }> = ({ children, icon }) => (
  <div className="flex items-center mb-6">
    {icon}
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white ml-3">{children}</h2>
  </div>
);

const LifeLine3a: React.FC = () => {
  const etapes = [
    { age: 25, label: "Ouverture", description: "Éligibilité AVS" },
    { age: 40, label: "Versements", description: "Déduction fiscale" },
    { age: 60, label: "Planification", description: "Stratégie de retrait" },
    { age: 65, label: "Retrait", description: "Imposition du capital" }
  ];

  return (
    <Card>
      <h3 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-200">📍 Ligne de vie du 3ᵉ pilier A</h3>
      <div className="relative pt-8">
        <div className="absolute top-14 left-10 right-10 h-1 bg-teal-200 dark:bg-teal-800"></div>
        <div className="relative flex justify-between items-start">
          {etapes.map((etape, index) => (
            <div key={index} className="flex flex-col items-center text-center w-24">
              <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-white dark:border-gray-800 mb-2 z-10">
                {etape.age}
              </div>
              <div className="font-semibold text-gray-800 dark:text-white">{etape.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{etape.description}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const Guides: React.FC = () => {
    const comparisonData = [
        { feature: 'Objectif principal', p3a: 'Prévoyance vieillesse', p3b: 'Épargne flexible' },
        { feature: 'Déduction fiscale', p3a: 'Oui (plafonnée)', p3b: 'Non (sauf GE/FR sous cond.)' },
        { feature: 'Plafond de versement', p3a: 'Oui (légal)', p3b: 'Non' },
        { feature: 'Disponibilité', p3a: 'Bloqué (sauf exceptions)', p3b: 'Libre' },
        { feature: 'Bénéficiaires', p3a: 'Ordre légal strict', p3b: 'Choix libre' },
        { feature: 'Imposition au retrait', p3a: 'Taux réduit, progressif', p3b: 'Exonéré (si conditions remplies)' },
    ];

    return (
        <div className="space-y-8">
            <Title icon={<BookOpen size={32} className="text-teal-500"/>}>Guides 3a / 3b / 3c</Title>
            <LifeLine3a />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">Pilier 3a : La prévoyance liée</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                        <li><strong>Éligibilité :</strong> Toute personne avec un revenu soumis à l'AVS.</li>
                        <li><strong>Plafonds 2025 :</strong> {PLAFONDS_2025.salarie.toLocaleString()} CHF (salariés), 20% du revenu net jusqu'à {PLAFONDS_2025.independant.toLocaleString()} CHF (indépendants).</li>
                        <li><strong>Avantage :</strong> Déduction du revenu imposable.</li>
                        <li><strong>Retrait anticipé :</strong> Achat logement principal, départ définitif de Suisse, mise à son compte, invalidité, rachat LPP.</li>
                        <li><strong>Imposition :</strong> Capital imposé séparément des autres revenus à un taux réduit.</li>
                    </ul>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Pilier 3b : La prévoyance libre</h3>
                     <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                        <li><strong>Flexibilité :</strong> Pas de plafond de versement, contrat sur mesure.</li>
                        <li><strong>Liquidité :</strong> Rachat possible à tout moment selon les conditions du contrat.</li>
                        <li><strong>Fiscalité :</strong> Pas de déduction fiscale (sauf exceptions cantonales). En contrepartie, le capital est généralement exonéré d'impôt au terme.</li>
                        <li><strong>Usages :</strong> Protection de la famille, financement de projets, optimisation successorale.</li>
                    </ul>
                </Card>
            </div>
            <Card>
                <h3 className="text-xl font-bold mb-4">Tableau Comparatif : 3a vs 3b</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Caractéristique</th>
                                <th scope="col" className="px-6 py-3 text-teal-600 dark:text-teal-400">Pilier 3a</th>
                                <th scope="col" className="px-6 py-3 text-indigo-600 dark:text-indigo-400">Pilier 3b</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, i) => (
                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.feature}</th>
                                    <td className="px-6 py-4">{row.p3a}</td>
                                    <td className="px-6 py-4">{row.p3b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

const FiscaliteCantons: React.FC = () => {
  const [selectedCanton, setSelectedCanton] = useState('VD');

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">🗺️ Fiscalité cantonale du retrait 3a</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sélectionnez un canton pour voir ses spécificités.</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(CANTONS_DATA).map((code) => (
              <button
                key={code}
                onClick={() => setSelectedCanton(code)}
                className={`p-3 rounded-lg text-sm font-bold transition-all ${
                  selectedCanton === code
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          {selectedCanton && (
            <>
              <h4 className="font-bold text-lg text-gray-800 dark:text-white">{CANTONS_DATA[selectedCanton].nom}</h4>
              <div className="mt-4 space-y-2 text-sm">
                <p><strong className="text-gray-600 dark:text-gray-300">Échelonnement max :</strong> {CANTONS_DATA[selectedCanton].echelonnement} an(s)</p>
                <p><strong className="text-gray-600 dark:text-gray-300">Taux marginal estimé :</strong> ~{CANTONS_DATA[selectedCanton].tauxMarginal}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-100 dark:bg-gray-600 p-2 rounded">
                  {CANTONS_DATA[selectedCanton].particularites}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

const ComparateurPage: React.FC = () => {
  const [selectedProviderName, setSelectedProviderName] = useState(PROVIDERS_DATA[0].nom);

  const selectedProvider = PROVIDERS_DATA.find(p => p.nom === selectedProviderName);

  const radarData = selectedProvider ? [
    { metric: 'Frais Bas', value: selectedProvider.type === 'Assurance' ? (5 - selectedProvider.fraisInitiaux) * 20 : (2 - selectedProvider.fraisGestion) * 50 },
    { metric: 'Rendement', value: selectedProvider.rendementNet5ans * 20 },
    { metric: 'Val. Rachat', value: selectedProvider.valeurRachatA3 },
    { metric: 'Flexibilité', value: selectedProvider.flexibilite * 10 },
  ] : [];

  const assurances = PROVIDERS_DATA.filter(p => p.type === 'Assurance');
  const banques = PROVIDERS_DATA.filter(p => p.type === 'Banque');

  return (
    <div className="space-y-8">
      <Title icon={<BarChart2 size={32} className="text-teal-500"/>}>Comparateur Banque vs. Assurance</Title>

      <Card>
        <h3 className="text-xl font-bold mb-4">Analyse Détaillée par Prestataire</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label htmlFor="provider-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Choisir un prestataire :</label>
            <select
              id="provider-select"
              value={selectedProviderName}
              onChange={(e) => setSelectedProviderName(e.target.value)}
              className="mb-4 p-2 border rounded-md w-full bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <optgroup label="Assurances">
                {assurances.map(p => <option key={p.nom} value={p.nom}>{p.nom}</option>)}
              </optgroup>
              <optgroup label="Banques & Plateformes">
                {banques.map(p => <option key={p.nom} value={p.nom}>{p.nom}</option>)}
              </optgroup>
            </select>
            {selectedProvider && (
                <>
                  <div className="text-sm space-y-1 mb-4">
                    {selectedProvider.type === 'Assurance' && <p><strong>Frais initiaux:</strong> {selectedProvider.fraisInitiaux}%</p>}
                    <p><strong>Frais gestion:</strong> {selectedProvider.fraisGestion}%</p>
                    {selectedProvider.type === 'Assurance' && <p><strong>Rachat à 3 ans:</strong> {selectedProvider.valeurRachatA3}%</p>}
                    <p><strong>Rendement 5 ans:</strong> {selectedProvider.rendementNet5ans}%</p>
                  </div>
                  {selectedProvider.redFlags.length > 0 && (
                    <div className="p-2 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded">
                      <div className="text-red-800 dark:text-red-300 text-sm font-semibold flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1" /> Red Flags
                      </div>
                      {selectedProvider.redFlags.map((flag, i) => <div key={i} className="text-red-700 dark:text-red-400 text-xs mt-1">• {flag}</div>)}
                    </div>
                  )}
                </>
            )}
          </div>
          <div className="md:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'currentColor' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar dataKey="value" stroke={selectedProvider?.type === 'Banque' ? '#6366f1' : '#ec4899'} fill={selectedProvider?.type === 'Banque' ? '#6366f1' : '#ec4899'} fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4">📈 Frais de gestion vs. Rendement net</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="fraisGestion" name="Frais de gestion" unit="%" tick={{ fill: 'currentColor' }} />
            <YAxis type="number" dataKey="rendementNet5ans" name="Rendement net" unit="%" tick={{ fill: 'currentColor' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                        <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow-lg">
                            <p className="font-bold">{data.nom}</p>
                            <p className="text-sm">Frais: {data.fraisGestion}%</p>
                            <p className="text-sm">Rendement: {data.rendementNet5ans}%</p>
                        </div>
                    );
                }
                return null;
            }}/>
            {PROVIDERS_DATA.filter(p => p.type === 'Banque').map(p => <Scatter key={p.nom} dataKey="rendementNet5ans" data={[p]} fill='#6366f1' name={p.nom} />)}
            {PROVIDERS_DATA.filter(p => p.type === 'Assurance').map(p => <Scatter key={p.nom} dataKey="rendementNet5ans" data={[p]} fill='#ec4899' name={p.nom} />)}
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex justify-center items-center space-x-4 mt-4 text-sm">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>Banque</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>Assurance</div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          💡 Idéal : en haut à gauche (faibles frais, bon rendement)
        </p>
      </Card>
    </div>
  );
};

const EtudeCas: React.FC = () => {
  const [canton, setCanton] = useState('VD');
  const [statut, setStatut] = useState('salarie');
  const [revenu, setRevenu] = useState(80000);
  const [recommendation, setRecommendation] = useState('');
  const [showEvaluation, setShowEvaluation] = useState(false);

  const calculateProjection = (versementAnnuel: number, rendement: number, annees: number) => {
    return versementAnnuel * (((1 + rendement/100) ** annees - 1) / (rendement/100));
  };

  const calculateTaxSaving = () => {
    const plafond = statut === 'salarie' ? PLAFONDS_2025.salarie : Math.min(revenu * 0.2, PLAFONDS_2025.independant);
    return plafond * (CANTONS_DATA[canton].tauxMarginal / 100);
  };

  const evaluateRecommendation = () => {
    let note = 5;
    let feedback = [];
    if (recommendation.toLowerCase().includes('échelonnement') && ['VD', 'GE', 'VS'].includes(canton)) {
      note += 2;
      feedback.push("✅ Bon: Stratégie d'échelonnement fiscal mentionnée.");
    } else if (!['VD', 'GE', 'VS'].includes(canton) && recommendation.toLowerCase().includes('échelonnement')) {
        feedback.push("⚠️ Attention: L'échelonnement n'est pas la stratégie optimale dans ce canton.");
    } else {
        feedback.push("❌ Manque: La stratégie fiscale de retrait n'est pas abordée.");
    }

    if (recommendation.toLowerCase().includes('frais')) {
      note += 1;
      feedback.push("✅ Bon: L'attention est portée sur les frais.");
    }
    if (recommendation.toLowerCase().includes('banque') && recommendation.toLowerCase().includes('assurance')) {
      note += 2;
      feedback.push("✅ Excellent: Le mix banque/assurance est bien considéré.");
    } else {
      feedback.push("⚠️ Manque: Pas de comparaison claire entre banque et assurance.");
    }

    return { note: Math.min(note, 10), feedback };
  };

  const plafondApplicable = statut === 'salarie' ? PLAFONDS_2025.salarie : Math.min(revenu * 0.2, PLAFONDS_2025.independant);
  const economieImpot = calculateTaxSaving();
  const capitalA65 = calculateProjection(plafondApplicable, 4, 25);

  return (
    <div className="space-y-8">
        <Title icon={<Briefcase size={32} className="text-teal-500"/>}>Étude de cas pratique</Title>
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Canton</label>
                    <select value={canton} onChange={(e) => setCanton(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                        {Object.entries(CANTONS_DATA).map(([code, data]) => <option key={code} value={code}>{data.nom}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Statut</label>
                    <select value={statut} onChange={(e) => setStatut(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                        <option value="salarie">Salarié</option>
                        <option value="independant">Indépendant</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Revenu (CHF)</label>
                    <input type="number" value={revenu} onChange={(e) => setRevenu(Number(e.target.value))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"/>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">📊 Situation calculée</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div><strong>Plafond 3a:</strong> {plafondApplicable.toLocaleString()} CHF</div>
                    <div><strong>Économie impôt/an:</strong> {Math.round(economieImpot).toLocaleString()} CHF</div>
                    <div><strong>Capital estimé à 65 ans:</strong> {Math.round(capitalA65).toLocaleString()} CHF</div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-2">Votre recommandation (mentionnez: banque vs assurance, échelonnement, frais):</label>
                <textarea value={recommendation} onChange={(e) => { setRecommendation(e.target.value); setShowEvaluation(false); }} className="w-full p-3 border rounded-md h-24 bg-white dark:bg-gray-700 dark:border-gray-600" placeholder="Ex: Je recommande un mix 70% banque 3a..."/>
            </div>
            <div className="mt-4">
                <button onClick={() => setShowEvaluation(true)} disabled={!recommendation.trim()} className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors">Évaluer ma recommandation</button>
            </div>
            {showEvaluation && (
                <div className="mt-6 bg-teal-50 dark:bg-gray-700/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">🎯 Évaluation du Mentor</h4>
                    {(() => {
                        const {note, feedback} = evaluateRecommendation();
                        return (
                            <div>
                                <div className="text-lg font-bold mb-2">Note: {note}/10</div>
                                <ul className="text-sm space-y-1 list-disc list-inside">
                                    {feedback.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                                <div className="mt-3 text-sm text-teal-700 dark:text-teal-300">
                                    <strong>Amélioration:</strong> {note < 8 ? "Pensez toujours à comparer frais nets, garanties, et stratégie fiscale cantonale." : "Excellent travail !"}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </Card>
    </div>
  );
};

const QuizRunner: React.FC<{ quiz: Quiz; onBack: () => void }> = ({ quiz, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ question: string; isCorrect: boolean }[]>([]);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correct;
    setAnswers([...answers, { question: quiz.questions[currentQuestion].question, isCorrect }]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswers([]);
  };

  const score = answers.filter(a => a.isCorrect).length;
  const isQuizFinished = answers.length === quiz.questions.length && showResult;

  if (isQuizFinished) {
    return (
        <Card className="text-center">
            <h3 className="text-2xl font-bold mb-4">Quiz Terminé !</h3>
            <p className="text-lg mb-2">Votre score :</p>
            <p className="text-5xl font-bold mb-6 text-teal-500">{score} / {quiz.questions.length}</p>
            <div className="space-y-4">
                <button onClick={restartQuiz} className="w-full px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center">
                    <Repeat className="mr-2" size={18}/> Recommencer le quiz
                </button>
                <button onClick={onBack} className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">
                    <ArrowLeft className="mr-2" size={18}/> Retour à la sélection
                </button>
            </div>
        </Card>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div>
        <button onClick={onBack} className="flex items-center text-sm text-teal-600 dark:text-teal-400 hover:underline mb-4">
            <ArrowLeft size={16} className="mr-1"/> Retour à la sélection
        </button>
        <Card>
            <h3 className="text-xl font-bold mb-2">Question {currentQuestion + 1}/{quiz.questions.length}</h3>
            <p className="text-lg mb-6">{question.question}</p>
            <div className="space-y-3">
                {question.options.map((option: string, index: number) => {
                    const isCorrect = index === question.correct;
                    const isSelected = selectedAnswer === index;
                    let buttonClass = 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
                    if (showResult) {
                        if (isCorrect) buttonClass = 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300';
                        else if (isSelected) buttonClass = 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300';
                    } else if (isSelected) {
                        buttonClass = 'bg-teal-100 dark:bg-teal-900/50 border-teal-500';
                    }
                    return (
                        <button key={index} onClick={() => setSelectedAnswer(index)} disabled={showResult}
                            className={`block w-full p-3 text-left rounded-lg border-2 transition-all ${buttonClass}`}>
                            {option}
                        </button>
                    );
                })}
            </div>
            <div className="mt-6">
                {!showResult ? (
                    <button onClick={handleAnswer} disabled={selectedAnswer === null} className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400">Valider</button>
                ) : (
                    <div>
                        <div className={`p-4 rounded-lg mb-4 ${selectedAnswer === question.correct ? 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}>
                            <p className="font-semibold">{selectedAnswer === question.correct ? '✅ Correct !' : '❌ Incorrect'}</p>
                            <p className="text-sm mt-2">{question.explication}</p>
                        </div>
                        <button onClick={nextQuestion} className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                           {currentQuestion < quiz.questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                        </button>
                    </div>
                )}
            </div>
        </Card>
    </div>
  );
};

const QuizSelection: React.FC = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

    if (selectedQuiz) {
        return <QuizRunner quiz={ALL_QUIZZES[selectedQuiz]} onBack={() => setSelectedQuiz(null)} />;
    }

    return (
        <div className="space-y-8">
            <Title icon={<HelpCircle size={32} className="text-teal-500"/>}>Quiz de validation</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(ALL_QUIZZES).map(([key, { title }]) => (
                    <Card key={key} className="cursor-pointer" onClick={() => setSelectedQuiz(key)}>
                        <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">{title}</h3>
                        <p className="text-sm text-gray-500 mt-2">Testez vos connaissances sur ce module.</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const ComplianceModule: React.FC = () => {
  const complianceItems = [
    "KYC client réalisé (profil risque, horizon, capacité)",
    "IPID remis avant signature",
    "Conditions générales expliquées",
    "Risques des unités de compte mentionnés",
    "Frais nets vs bruts clarifiés",
    "Alternatives comparées (banque vs assurance)",
    "Archivage 10 ans prévu"
  ];
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const toggleCheck = (index: number) => setCheckedItems(prev => ({...prev, [index]: !prev[index]}));

  return (
    <div className="space-y-8">
        <Title icon={<Shield size={32} className="text-teal-500"/>}>Compliance FINMA/LBA</Title>
        <Card>
            <h3 className="text-xl font-bold mb-4">Check-list de conformité</h3>
            <div className="space-y-3">
                {complianceItems.map((item, index) => (
                    <div key={index} className="flex items-center cursor-pointer" onClick={() => toggleCheck(index)}>
                        <div className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checkedItems[index] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-500'}`}>
                            {checkedItems[index] && '✓'}
                        </div>
                        <span className={`${checkedItems[index] ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{item}</span>
                    </div>
                ))}
            </div>
        </Card>
        <div className="p-4 bg-yellow-50 dark:bg-gray-700/50 border-l-4 border-yellow-400">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-300">⚠️ Erreurs typiques du débutant</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-200 mt-2 space-y-1 list-disc list-inside">
                <li>Confondre banque 3a (liquidité) et assurance 3a (garanties).</li>
                <li>Ignorer les frais d'acquisition vs frais de gestion.</li>
                <li>Promettre des rendements bruts au lieu de nets.</li>
                <li>Proposer un retrait unique au lieu d'un échelonnement fiscal.</li>
            </ul>
        </div>
    </div>
  );
};

const Accueil: React.FC<{ setCurrentSection: (section: string) => void }> = ({ setCurrentSection }) => (
    <div className="space-y-8">
        <div className="text-center py-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-2">Piliarium-App</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">L'outil de formation d'élite pour courtiers suisses romands</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => setCurrentSection('guides')} className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1">
                <BookOpen className="w-10 h-10 mb-3 opacity-80" />
                <h3 className="text-xl font-bold mb-2">Découvrir</h3>
                <p className="text-teal-100 text-sm">3a/3b/3c - Cadre légal, fiscalité, exceptions.</p>
            </div>
            <div onClick={() => setCurrentSection('comparateur')} className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1">
                <BarChart2 className="w-10 h-10 mb-3 opacity-80" />
                <h3 className="text-xl font-bold mb-2">Comparer</h3>
                <p className="text-indigo-100 text-sm">Banque vs Assurance - Frais, garanties, rendements.</p>
            </div>
            <div onClick={() => setCurrentSection('quiz')} className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1">
                <HelpCircle className="w-10 h-10 mb-3 opacity-80" />
                <h3 className="text-xl font-bold mb-2">S'entraîner</h3>
                <p className="text-pink-100 text-sm">Quiz adaptatifs et études de cas pratiques.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FiscaliteCantons />
            <ComplianceModule />
        </div>
    </div>
);

// --- APPLICATION PRINCIPALE ---
const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('accueil');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false;
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode]);

  const sections: Record<string, SectionMeta> = useMemo(() => ({
    'accueil': { title: 'Accueil', component: <Accueil setCurrentSection={setCurrentSection} />, icon: Home },
    'guides': { title: 'Guides 3a/3b/3c', component: <Guides />, icon: BookOpen },
    'cantons': { title: 'Fiscalité Cantonale', component: <FiscaliteCantons />, icon: Map },
    'comparateur': { title: 'Comparateur', component: <ComparateurPage />, icon: BarChart2 },
    'etudes-de-cas': { title: 'Études de cas', component: <EtudeCas />, icon: Briefcase },
    'quiz': { title: 'Quiz', component: <QuizSelection />, icon: HelpCircle },
    'compliance': { title: 'Compliance', component: <ComplianceModule />, icon: Shield }
  }), []);

  const NavLink: React.FC<{ sectionKey: string; children: React.ReactNode }> = ({ sectionKey, children }) => (
      <button
          onClick={() => {
              setCurrentSection(sectionKey);
              setSidebarOpen(false);
          }}
          className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              currentSection === sectionKey
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
      >
          {children}
      </button>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
        <aside className={`absolute md:relative z-20 md:z-auto w-64 bg-white dark:bg-gray-800 shadow-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
            <div className="p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-teal-500">Piliarium-App</h1>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-600 dark:text-gray-300">
                    <X size={24} />
                </button>
            </div>
            <nav className="p-4 space-y-2">
                {Object.entries(sections).map(([key, { title, icon: Icon }]) => (
                    <NavLink key={key} sectionKey={key}>
                        <Icon className="mr-3" size={20} />
                        {title}
                    </NavLink>
                ))}
            </nav>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 dark:text-gray-300">
                <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold">{sections[currentSection].title}</h2>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50">
            {sections[currentSection].component}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

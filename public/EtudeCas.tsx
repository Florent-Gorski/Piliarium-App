import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';

// Composant générique de carte
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    {...props}
    className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

// Titre avec icône
const Title: React.FC<{ children: React.ReactNode; icon: React.ReactNode }> = ({
  children,
  icon,
}) => (
  <div className="flex items-center mb-6">
    {icon}
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white ml-3">
      {children}
    </h2>
  </div>
);

// Données
const PLAFONDS_2025 = {
  salarie: 7258,
  independant: 36288,
};

const CANTONS_DATA: Record<
  string,
  { nom: string; echelonnement: number; tauxMarginal: number }
> = {
  VD: { nom: 'Vaud', echelonnement: 3, tauxMarginal: 42 },
  GE: { nom: 'Genève', echelonnement: 3, tauxMarginal: 45 },
  VS: { nom: 'Valais', echelonnement: 5, tauxMarginal: 38 },
  FR: { nom: 'Fribourg', echelonnement: 1, tauxMarginal: 40 },
  NE: { nom: 'Neuchâtel', echelonnement: 1, tauxMarginal: 43 },
  JU: { nom: 'Jura', echelonnement: 1, tauxMarginal: 41 },
};

// === PAGE ÉTUDE DE CAS ===
export const EtudeCas: React.FC = () =>
{
  const [canton, setCanton] = useState('VD');
  const [statut, setStatut] = useState<'salarie' | 'independant'>('salarie');
  const [revenu, setRevenu] = useState(80000);
  const [recommendation, setRecommendation] = useState('');
  const [showEvaluation, setShowEvaluation] = useState(false);

  // Projection capitalisé
  const calculateProjection = (versementAnnuel: number, rendement: number, annees: number) =>
  {
    return versementAnnuel * (((1 + rendement / 100) ** annees - 1) / (rendement / 100));
  };

  // Économie fiscale annuelle
  const calculateTaxSaving = () =>
  {
    const plafond =
      statut === 'salarie'
        ? PLAFONDS_2025.salarie
        : Math.min(revenu * 0.2, PLAFONDS_2025.independant);
    return plafond * (CANTONS_DATA[canton].tauxMarginal / 100);
  };

  // Évaluer la reco
  const evaluateRecommendation = () =>
  {
    let note = 5;
    let feedback: string[] = [];

    if (recommendation.toLowerCase().includes('échelonnement') && ['VD', 'GE', 'VS'].includes(canton)) {
      note += 2;
      feedback.push("✅ Bon: Stratégie d'échelonnement fiscal mentionnée.");
    } else if (
      !['VD', 'GE', 'VS'].includes(canton) &&
      recommendation.toLowerCase().includes('échelonnement')
    ) {
      feedback.push("⚠️ Attention: L'échelonnement n'est pas optimal dans ce canton.");
    } else {
      feedback.push("❌ Manque: Stratégie fiscale de retrait absente.");
    }

    if (recommendation.toLowerCase().includes('frais')) {
      note += 1;
      feedback.push('✅ Bon: Sensibilité aux frais démontrée.');
    }

    if (recommendation.toLowerCase().includes('banque') && recommendation.toLowerCase().includes('assurance')) {
      note += 2;
      feedback.push('✅ Excellent: Mix banque/assurance bien considéré.');
    } else {
      feedback.push('⚠️ Manque: Pas de comparaison claire banque vs assurance.');
    }

    return { note: Math.min(note, 10), feedback };
  };

  const plafondApplicable =
    statut === 'salarie'
      ? PLAFONDS_2025.salarie
      : Math.min(revenu * 0.2, PLAFONDS_2025.independant);
  const economieImpot = calculateTaxSaving();
  const capitalA65 = calculateProjection(plafondApplicable, 4, 25);

  return (
    <div className="space-y-8">
      <Title icon={<Briefcase size={32} className="text-teal-500" />}>
        Étude de cas pratique
      </Title>

      <Card>
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Canton</label>
            <select
              value={canton}
              onChange={(e) => setCanton(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              {Object.entries(CANTONS_DATA).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Statut</label>
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value as 'salarie' | 'independant')}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="salarie">Salarié</option>
              <option value="independant">Indépendant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Revenu (CHF)</label>
            <input
              type="number"
              value={revenu}
              onChange={(e) => setRevenu(Number(e.target.value))}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Résumé calculé */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">📊 Situation calculée</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Plafond 3a:</strong> {plafondApplicable.toLocaleString()} CHF
            </div>
            <div>
              <strong>Économie impôt/an:</strong> {Math.round(economieImpot).toLocaleString()} CHF
            </div>
            <div>
              <strong>Capital estimé à 65 ans:</strong> {Math.round(capitalA65).toLocaleString()} CHF
            </div>
          </div>
        </div>

        {/* Recommandation */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Votre recommandation :
          </label>
          <textarea
            value={recommendation}
            onChange={(e) =>
            {
              setRecommendation(e.target.value);
              setShowEvaluation(false);
            }}
            className="w-full p-3 border rounded-md h-24 bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: Je recommande un mix 70% banque 3a, 30% assurance 3a, avec échelonnement sur 3 ans..."
          />
        </div>

        {/* Bouton évaluer */}
        <div className="mt-4">
          <button
            onClick={() => setShowEvaluation(true)}
            disabled={!recommendation.trim()}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
          >
            Évaluer ma recommandation
          </button>
        </div>

        {/* Évaluation */}
        {showEvaluation && (
          <div className="mt-6 bg-teal-50 dark:bg-gray-700/80 p-4 rounded-lg">
            <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">
              🎯 Évaluation du Mentor
            </h4>
            {(() =>
            {
              const { note, feedback } = evaluateRecommendation();
              return (
                <div>
                  <div className="text-lg font-bold mb-2">Note: {note}/10</div>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    {feedback.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-3 text-sm text-teal-700 dark:text-teal-300">
                    <strong>Amélioration:</strong>{' '}
                    {note < 8
                      ? 'Pensez toujours à comparer frais nets, garanties et stratégie fiscale cantonale.'
                      : 'Excellent travail !'}
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

import React from 'react';
import { BookOpen } from 'lucide-react';

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

// Ligne de vie du 3ᵉ pilier A
const LifeLine3a: React.FC = () =>
{
  const etapes = [
    { age: 25, label: 'Ouverture', description: "Éligibilité AVS" },
    { age: 40, label: 'Versements', description: 'Déduction fiscale' },
    { age: 60, label: 'Planification', description: 'Stratégie de retrait' },
    { age: 65, label: 'Retrait', description: 'Imposition du capital' },
  ];

  return (
    <Card>
      <h3 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-200">
        📍 Ligne de vie du 3ᵉ pilier A
      </h3>
      <div className="relative pt-8">
        <div className="absolute top-14 left-10 right-10 h-1 bg-teal-200 dark:bg-teal-800"></div>
        <div className="relative flex justify-between items-start">
          {etapes.map((etape, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-24"
            >
              <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-white dark:border-gray-800 mb-2 z-10">
                {etape.age}
              </div>
              <div className="font-semibold text-gray-800 dark:text-white">
                {etape.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {etape.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Page Guides (3a / 3b / 3c)
export const Guides: React.FC = () =>
{
  const PLAFONDS_2025 = {
    salarie: 7258,
    independant: 36288,
  };

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
      <Title icon={<BookOpen size={32} className="text-teal-500" />}>
        Guides 3a / 3b / 3c
      </Title>

      {/* Ligne de vie */}
      <LifeLine3a />

      {/* Cartes explicatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">
            Pilier 3a : La prévoyance liée
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li>
              <strong>Éligibilité :</strong> Toute personne avec un revenu soumis
              à l&apos;AVS.
            </li>
            <li>
              <strong>Plafonds 2025 :</strong> {PLAFONDS_2025.salarie.toLocaleString()} CHF
              (salariés), 20% du revenu net jusqu&apos;à{' '}
              {PLAFONDS_2025.independant.toLocaleString()} CHF (indépendants).
            </li>
            <li>
              <strong>Avantage :</strong> Déduction du revenu imposable.
            </li>
            <li>
              <strong>Retrait anticipé :</strong> Achat logement principal,
              départ définitif de Suisse, mise à son compte, invalidité, rachat
              LPP.
            </li>
            <li>
              <strong>Imposition :</strong> Capital imposé séparément à taux réduit.
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            Pilier 3b : La prévoyance libre
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li>
              <strong>Flexibilité :</strong> Pas de plafond de versement, contrat
              sur mesure.
            </li>
            <li>
              <strong>Liquidité :</strong> Rachat possible à tout moment selon
              contrat.
            </li>
            <li>
              <strong>Fiscalité :</strong> Pas de déduction (sauf exceptions
              cantonales). Capital exonéré au terme.
            </li>
            <li>
              <strong>Usages :</strong> Protection famille, financement projets,
              optimisation successorale.
            </li>
          </ul>
        </Card>
      </div>

      {/* Tableau comparatif */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Tableau Comparatif : 3a vs 3b</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Caractéristique
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-teal-600 dark:text-teal-400"
                >
                  Pilier 3a
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-indigo-600 dark:text-indigo-400"
                >
                  Pilier 3b
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {row.feature}
                  </th>
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

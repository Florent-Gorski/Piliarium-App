import React, { useState } from 'react';
import { Map } from 'lucide-react';

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

// Données cantonales
const CANTONS_DATA: Record<
  string,
  { nom: string; echelonnement: number; tauxMarginal: number; particularites: string }
> = {
  VD: {
    nom: 'Vaud',
    echelonnement: 3,
    tauxMarginal: 42,
    particularites: "Max 3 ans d'échelonnement pour lisser l'impôt.",
  },
  GE: {
    nom: 'Genève',
    echelonnement: 3,
    tauxMarginal: 45,
    particularites: '3b partiellement déductible sous conditions.',
  },
  VS: {
    nom: 'Valais',
    echelonnement: 5,
    tauxMarginal: 38,
    particularites: 'Fiscalité avantageuse au retrait.',
  },
  FR: {
    nom: 'Fribourg',
    echelonnement: 1,
    tauxMarginal: 40,
    particularites: '3b déductible sous conditions strictes.',
  },
  NE: {
    nom: 'Neuchâtel',
    echelonnement: 1,
    tauxMarginal: 43,
    particularites: 'Taux unique au retrait.',
  },
  JU: {
    nom: 'Jura',
    echelonnement: 1,
    tauxMarginal: 41,
    particularites: 'Barème progressif modéré.',
  },
};

export const FiscaliteCantons: React.FC = () =>
{
  const [selectedCanton, setSelectedCanton] = useState('VD');

  return (
    <div className="space-y-8">
      <Title icon={<Map size={32} className="text-teal-500" />}>
        Fiscalité Cantonale
      </Title>

      <Card>
        <h3 className="text-xl font-bold mb-4">🗺️ Fiscalité cantonale du retrait 3a</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sélecteur de canton */}
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Sélectionnez un canton pour voir ses spécificités :
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(CANTONS_DATA).map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedCanton(code)}
                  className={`p-3 rounded-lg text-sm font-bold transition-all ${selectedCanton === code
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Affichage des infos */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            {selectedCanton && (
              <>
                <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                  {CANTONS_DATA[selectedCanton].nom}
                </h4>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Échelonnement max :
                    </strong>{' '}
                    {CANTONS_DATA[selectedCanton].echelonnement} an(s)
                  </p>
                  <p>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Taux marginal estimé :
                    </strong>{' '}
                    ~{CANTONS_DATA[selectedCanton].tauxMarginal}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-100 dark:bg-gray-600 p-2 rounded">
                    {CANTONS_DATA[selectedCanton].particularites}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

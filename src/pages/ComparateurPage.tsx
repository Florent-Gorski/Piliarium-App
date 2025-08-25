import React, { useState } from 'react';
import
  {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
import { BarChart2, HelpCircle } from 'lucide-react';

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

// Données comparateur (banques & assurances)
const PROVIDERS_DATA = [
  { nom: 'Allianz Suisse', type: 'Assurance', fraisInitiaux: 2.9, fraisGestion: 1.1, valeurRachatA3: 87, rendementNet5ans: 3.7, flexibilite: 8, redFlags: ['Performance volatile'] },
  { nom: 'AXA', type: 'Assurance', fraisInitiaux: 2.8, fraisGestion: 1.1, valeurRachatA3: 88, rendementNet5ans: 3.9, flexibilite: 8, redFlags: ['Exclusions santé'] },
  { nom: 'Helvetia', type: 'Assurance', fraisInitiaux: 2.5, fraisGestion: 1.0, valeurRachatA3: 90, rendementNet5ans: 4.0, flexibilite: 9, redFlags: [] },
  { nom: 'La Mobilière', type: 'Assurance', fraisInitiaux: 2.2, fraisGestion: 0.9, valeurRachatA3: 92, rendementNet5ans: 3.6, flexibilite: 9, redFlags: [] },
  { nom: 'Swiss Life', type: 'Assurance', fraisInitiaux: 3.5, fraisGestion: 1.2, valeurRachatA3: 85, rendementNet5ans: 4.2, flexibilite: 7, redFlags: ['Frais acquisition élevés'] },
  { nom: 'Zurich Assurances', type: 'Assurance', fraisInitiaux: 3.2, fraisGestion: 1.3, valeurRachatA3: 82, rendementNet5ans: 4.1, flexibilite: 6, redFlags: ['Rachat limité 5 ans'] },
  { nom: 'BCV (Vaud)', type: 'Banque', fraisInitiaux: 0, fraisGestion: 0.6, valeurRachatA3: 100, rendementNet5ans: 4.5, flexibilite: 10, redFlags: [] },
  { nom: 'Finpension', type: 'Banque', fraisInitiaux: 0, fraisGestion: 0.39, valeurRachatA3: 100, rendementNet5ans: 5.0, flexibilite: 10, redFlags: ['Solution 100% en ligne'] },
  { nom: 'VIAC (via WIR)', type: 'Banque', fraisInitiaux: 0, fraisGestion: 0.44, valeurRachatA3: 100, rendementNet5ans: 5.1, flexibilite: 10, redFlags: ['Solution 100% en ligne'] },
];

// === PAGE COMPARATEUR ===
export const ComparateurPage: React.FC = () =>
{
  const [selectedProviderName, setSelectedProviderName] = useState(PROVIDERS_DATA[0].nom);

  const selectedProvider = PROVIDERS_DATA.find((p) => p.nom === selectedProviderName);

  const radarData =
    selectedProvider && [
      {
        metric: 'Frais Bas',
        value:
          selectedProvider.type === 'Assurance'
            ? (5 - selectedProvider.fraisInitiaux) * 20
            : (2 - selectedProvider.fraisGestion) * 50,
      },
      { metric: 'Rendement', value: selectedProvider.rendementNet5ans * 20 },
      { metric: 'Val. Rachat', value: selectedProvider.valeurRachatA3 },
      { metric: 'Flexibilité', value: selectedProvider.flexibilite * 10 },
    ];

  const assurances = PROVIDERS_DATA.filter((p) => p.type === 'Assurance');
  const banques = PROVIDERS_DATA.filter((p) => p.type === 'Banque');

  return (
    <div className="space-y-8">
      <Title icon={<BarChart2 size={32} className="text-teal-500" />}>
        Comparateur Banque vs. Assurance
      </Title>

      {/* Analyse détaillée */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Analyse Détaillée par Prestataire</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Selecteur prestataire */}
          <div className="md:col-span-1">
            <label
              htmlFor="provider-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Choisir un prestataire :
            </label>
            <select
              id="provider-select"
              value={selectedProviderName}
              onChange={(e) => setSelectedProviderName(e.target.value)}
              className="mb-4 p-2 border rounded-md w-full bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <optgroup label="Assurances">
                {assurances.map((p) => (
                  <option key={p.nom} value={p.nom}>
                    {p.nom}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Banques & Plateformes">
                {banques.map((p) => (
                  <option key={p.nom} value={p.nom}>
                    {p.nom}
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Infos du prestataire */}
            {selectedProvider && (
              <div className="text-sm space-y-1 mb-4">
                {selectedProvider.type === 'Assurance' && (
                  <p>
                    <strong>Frais initiaux:</strong> {selectedProvider.fraisInitiaux}%
                  </p>
                )}
                <p>
                  <strong>Frais gestion:</strong> {selectedProvider.fraisGestion}%
                </p>
                {selectedProvider.type === 'Assurance' && (
                  <p>
                    <strong>Rachat à 3 ans:</strong> {selectedProvider.valeurRachatA3}%
                  </p>
                )}
                <p>
                  <strong>Rendement 5 ans:</strong> {selectedProvider.rendementNet5ans}%
                </p>
              </div>
            )}

            {/* Red Flags */}
            {selectedProvider && selectedProvider.redFlags.length > 0 && (
              <div className="p-2 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded">
                <div className="text-red-800 dark:text-red-300 text-sm font-semibold flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1" /> Red Flags
                </div>
                {selectedProvider.redFlags.map((flag, i) => (
                  <div key={i} className="text-red-700 dark:text-red-400 text-xs mt-1">
                    • {flag}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RadarChart */}
          <div className="md:col-span-2">
            {radarData && (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'currentColor' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} />
                  <Radar
                    dataKey="value"
                    stroke={selectedProvider?.type === 'Banque' ? '#6366f1' : '#ec4899'}
                    fill={selectedProvider?.type === 'Banque' ? '#6366f1' : '#ec4899'}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </Card>

      {/* ScatterChart Frais vs Rendement */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📈 Frais de gestion vs. Rendement net</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="fraisGestion"
              name="Frais de gestion"
              unit="%"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              type="number"
              dataKey="rendementNet5ans"
              name="Rendement net"
              unit="%"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) =>
              {
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
              }}
            />
            {banques.map((p) => (
              <Scatter key={p.nom} data={[p]} fill="#6366f1" name={p.nom} />
            ))}
            {assurances.map((p) => (
              <Scatter key={p.nom} data={[p]} fill="#ec4899" name={p.nom} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex justify-center items-center space-x-4 mt-4 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>Banque
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>Assurance
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          💡 Idéal : en haut à gauche (faibles frais, bon rendement)
        </p>
      </Card>
    </div>
  );
};

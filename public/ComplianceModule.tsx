import React, { useState } from 'react';
import { Shield } from 'lucide-react';

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

// === PAGE COMPLIANCE ===
export const ComplianceModule: React.FC = () =>
{
  const complianceItems = [
    'KYC client réalisé (profil risque, horizon, capacité)',
    'IPID remis avant signature',
    'Conditions générales expliquées',
    'Risques des unités de compte mentionnés',
    'Frais nets vs bruts clarifiés',
    'Alternatives comparées (banque vs assurance)',
    'Archivage 10 ans prévu',
  ];

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) =>
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="space-y-8">
      <Title icon={<Shield size={32} className="text-teal-500" />}>
        Compliance FINMA / LBA
      </Title>

      <Card>
        <h3 className="text-xl font-bold mb-4">Check-list de conformité</h3>
        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer"
              onClick={() => toggleCheck(index)}
            >
              <div
                className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checkedItems[index]
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-500'
                  }`}
              >
                {checkedItems[index] && '✓'}
              </div>
              <span
                className={`${checkedItems[index]
                    ? 'line-through text-gray-500'
                    : 'text-gray-700 dark:text-gray-300'
                  }`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="p-4 bg-yellow-50 dark:bg-gray-700/50 border-l-4 border-yellow-400">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-300">
          ⚠️ Erreurs typiques du débutant
        </h4>
        <ul className="text-sm text-yellow-700 dark:text-yellow-200 mt-2 space-y-1 list-disc list-inside">
          <li>Confondre banque 3a (liquidité) et assurance 3a (garanties).</li>
          <li>Ignorer les frais d’acquisition vs frais de gestion.</li>
          <li>Promettre des rendements bruts au lieu de nets.</li>
          <li>Proposer un retrait unique au lieu d’un échelonnement fiscal.</li>
        </ul>
      </div>
    </div>
  );
};

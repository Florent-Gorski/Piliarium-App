import React from 'react';

export const FiscaliteCantons: React.FC = () =>
{
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-600">Fiscalité Cantonale</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Ici seront affichées les données fiscales par canton (VD, GE, VS, etc.).
      </p>
    </div>
  );
};

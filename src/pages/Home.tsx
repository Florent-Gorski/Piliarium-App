import React from 'react';
import { Button } from '@/components/Button';

export const Home: React.FC = () =>
{
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
        Bienvenue sur Piliarium-App 👋
      </h2>
      <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        L’outil de formation interactif pour les courtiers suisses romands.
        Explorez les guides sur le 3ᵉ pilier, comparez les solutions, testez vos connaissances avec des quiz, et entraînez-vous avec des études de cas réalistes.
      </p>
      <div className="flex justify-center">
        <Button onClick={() => alert('🚀 En route vers la formation !')}>
          Commencer la formation
        </Button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, Repeat } from 'lucide-react';

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

// =============================
// === Données des quiz ===
// =============================
const ALL_QUIZZES: Record<
  string,
  {
    title: string;
    questions: { id: number; question: string; options: string[]; correct: number; explication: string }[];
  }
> = {
  fondamentaux: {
    title: 'Fondamentaux du 3e Pilier',
    questions: [
      {
        id: 1,
        question: 'Quel est le plafond 3a 2025 pour un salarié ?',
        options: ["6'883 CHF", "7'258 CHF", 'Variable selon le revenu', "36'288 CHF"],
        correct: 1,
        explication: 'Le plafond 3a pour les salariés est fixé à 7’258 CHF en 2025.',
      },
      {
        id: 2,
        question: "Lequel de ces motifs n'est PAS une exception de retrait anticipé 3a ?",
        options: [
          "Achat d'un logement principal",
          "Création d'une entreprise",
          "Achat d'une voiture de luxe",
          'Départ définitif de Suisse',
        ],
        correct: 2,
        explication:
          "L'achat d'une voiture n'est pas un motif autorisé. Seuls logement, départ définitif, mise à son compte, invalidité ou rachat LPP le sont.",
      },
      {
        id: 3,
        question: 'Quelle est la principale caractéristique du pilier 3b ?',
        options: [
          'Déduction fiscale maximale',
          'Flexibilité et liberté contractuelle',
          'Blocage des fonds jusqu’à 65 ans',
          'Plafond annuel de versement',
        ],
        correct: 1,
        explication:
          'Le pilier 3b est très flexible, sans plafond légal et avec rachat possible selon contrat.',
      },
    ],
  },
  fiscalite: {
    title: 'Fiscalité & Cantons',
    questions: [
      {
        id: 1,
        question: "Dans quel canton l'échelonnement du retrait 3a est possible sur 5 ans ?",
        options: ['Vaud (VD)', 'Genève (GE)', 'Valais (VS)', 'Neuchâtel (NE)'],
        correct: 2,
        explication: 'Le Valais (VS) autorise un échelonnement jusqu’à 5 ans.',
      },
      {
        id: 2,
        question: "Pourquoi ouvrir plusieurs comptes 3a est-il fiscalement judicieux ?",
        options: [
          'Pour diversifier les banques',
          'Pour échelonner les retraits et réduire l’impôt progressif',
          'Pour obtenir de meilleurs taux',
          "Parce que c'est obligatoire",
        ],
        correct: 1,
        explication:
          'Échelonner les retraits sur plusieurs années réduit l’impact de la progressivité fiscale.',
      },
      {
        id: 3,
        question: 'Dans quel canton le pilier 3b est-il partiellement déductible ?',
        options: ['Zurich', 'Berne', 'Genève', 'Tessin'],
        correct: 2,
        explication: 'Genève et Fribourg offrent, sous conditions, des déductions 3b.',
      },
    ],
  },
  produits: {
    title: 'Produits & Red Flags',
    questions: [
      {
        id: 1,
        question: 'Principal inconvénient d’une assurance 3a par rapport à une banque 3a ?',
        options: [
          'Rendement toujours plus faible',
          "Frais d’acquisition élevés et faible valeur de rachat au début",
          'Moins de sécurité',
          'Pas de déduction fiscale',
        ],
        correct: 1,
        explication:
          'Les assurances 3a comportent des frais initiaux importants qui pèsent sur la valeur de rachat au début.',
      },
      {
        id: 2,
        question: "Un 'red flag' majeur dans une offre 3a est…",
        options: [
          'Des frais de gestion de 0.5%',
          'Une valeur de rachat 100% dès la 1ère année',
          'Des performances brutes mises en avant',
          'Une garantie décès incluse',
        ],
        correct: 2,
        explication:
          'Les performances brutes sont trompeuses. Il faut toujours regarder le rendement net après frais.',
      },
      {
        id: 3,
        question: 'Que signifie KYC ?',
        options: [
          'Keep Your Capital',
          'Know Your Customer',
          'Key Yield Calculation',
          'Aucune de ces réponses',
        ],
        correct: 1,
        explication:
          'KYC = Know Your Customer. Obligation légale de vérifier l’identité et le profil du client.',
      },
    ],
  },
};

// =============================
// === Quiz Runner ===
// =============================
const QuizRunner: React.FC<{ quiz: typeof ALL_QUIZZES[string]; onBack: () => void }> = ({
  quiz,
  onBack,
}) =>
{
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ question: string; isCorrect: boolean }[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = () =>
  {
    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correct;
    setAnswers([...answers, { question: quiz.questions[currentQuestion].question, isCorrect }]);
    setShowResult(true);
  };

  const nextQuestion = () =>
  {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restartQuiz = () =>
  {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
  };

  const score = answers.filter((a) => a.isCorrect).length;
  const isQuizFinished = answers.length === quiz.questions.length && showResult;

  if (isQuizFinished) {
    return (
      <Card className="text-center">
        <h3 className="text-2xl font-bold mb-4">Quiz Terminé !</h3>
        <p className="text-lg mb-2">Votre score :</p>
        <p className="text-5xl font-bold mb-6 text-teal-500">
          {score} / {quiz.questions.length}
        </p>
        <div className="space-y-4">
          <button
            onClick={restartQuiz}
            className="w-full px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center justify-center"
          >
            <Repeat className="mr-2" size={18} /> Recommencer
          </button>
          <button
            onClick={onBack}
            className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} /> Retour
          </button>
        </div>
      </Card>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <Card>
      <button
        onClick={onBack}
        className="flex items-center text-sm text-teal-600 dark:text-teal-400 hover:underline mb-4"
      >
        <ArrowLeft size={16} className="mr-1" /> Retour
      </button>
      <h3 className="text-xl font-bold mb-2">
        Question {currentQuestion + 1}/{quiz.questions.length}
      </h3>
      <p className="text-lg mb-6">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, index) =>
        {
          const isCorrect = index === question.correct;
          const isSelected = selectedAnswer === index;

          let buttonClass =
            'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
          if (showResult) {
            if (isCorrect)
              buttonClass =
                'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300';
            else if (isSelected)
              buttonClass =
                'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300';
          } else if (isSelected) {
            buttonClass = 'bg-teal-100 dark:bg-teal-900/50 border-teal-500';
          }

          return (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              disabled={showResult}
              className={`block w-full p-3 text-left rounded-lg border-2 transition-all ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {!showResult ? (
          <button
            onClick={handleAnswer}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Question suivante' : 'Voir score'}
          </button>
        )}
      </div>
    </Card>
  );
};

// =============================
// === Sélection des quiz ===
// =============================
export const QuizSelection: React.FC = () =>
{
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  if (selectedQuiz) {
    return (
      <QuizRunner
        quiz={ALL_QUIZZES[selectedQuiz]}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <Title icon={<HelpCircle size={32} className="text-teal-500" />}>
        Quiz de validation
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(ALL_QUIZZES).map(([key, { title }]) => (
          <Card
            key={key}
            className="cursor-pointer"
            onClick={() => setSelectedQuiz(key)}
          >
            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Testez vos connaissances sur ce module.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};


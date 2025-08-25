import React, { useState } from 'react';
import
  {
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  } from 'recharts';
import
  {
    Home, BookOpen, Map, BarChart2, Briefcase, HelpCircle, Shield,
    Moon, Sun, Menu, X, ArrowLeft, Repeat,
  } from 'lucide-react';

// ================== TYPES ==================
type Provider = {
  nom: string;
  type: 'Assurance' | 'Banque';
  fraisInitiaux?: number;
  fraisGestion: number;
  valeurRachatA3?: number;
  rendementNet5ans: number;
  garantieDeces: string;
  flexibilite: number;
  redFlags: string[];
};

type CantonData = {
  nom: string;
  echelonnement: number;
  tauxMarginal: number;
  particularites: string;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explication: string;
};

type Quiz = {
  title: string;
  questions: QuizQuestion[];
};

// ================== DONNÉES ==================
const PLAFONDS_2025 = {
  salarie: 7258,
  independant: 36288,
};

const CANTONS_DATA: Record<string, CantonData> = {
  VD: { nom: 'Vaud', echelonnement: 3, tauxMarginal: 42, particularites: 'Max 3 ans échelonnement.' },
  GE: { nom: 'Genève', echelonnement: 3, tauxMarginal: 45, particularites: '3b partiellement déductible.' },
  VS: { nom: 'Valais', echelonnement: 5, tauxMarginal: 38, particularites: 'Fiscalité avantageuse au retrait.' },
  FR: { nom: 'Fribourg', echelonnement: 1, tauxMarginal: 40, particularites: '3b déductible sous conditions.' },
  NE: { nom: 'Neuchâtel', echelonnement: 1, tauxMarginal: 43, particularites: 'Taux unique au retrait.' },
  JU: { nom: 'Jura', echelonnement: 1, tauxMarginal: 41, particularites: 'Barème progressif modéré.' },
};

const PROVIDERS_DATA: Provider[] = [
  { nom: 'Swiss Life', type: 'Assurance', fraisInitiaux: 3.5, fraisGestion: 1.2, valeurRachatA3: 85, rendementNet5ans: 4.2, garantieDeces: 'Élevée', flexibilite: 7, redFlags: ['Frais acquisition élevés'] },
  { nom: 'BCV (Vaud)', type: 'Banque', fraisGestion: 0.6, rendementNet5ans: 4.5, garantieDeces: 'Optionnelle', flexibilite: 10, redFlags: [] },
  // 👉 je garde ton modèle, à compléter avec les autres entrées
];

const ALL_QUIZZES: Record<string, Quiz> = {
  fondamentaux: {
    title: 'Fondamentaux du 3e Pilier',
    questions: [
      {
        id: 1,
        question: "Quel est le plafond 3a 2025 pour un salarié ?",
        options: ["6'883 CHF", "7'258 CHF", "Variable selon le revenu", "36'288 CHF"],
        correct: 1,
        explication: "Le plafond 3a pour les salariés est fixé à 7'258 CHF en 2025.",
      },
    ],
  },
};

// ================== COMPOSANTS UTILES ==================
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div
    {...props}
    className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode; icon: React.ReactNode }> = ({ children, icon }) => (
  <div className="flex items-center mb-6">
    {icon}
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white ml-3">{children}</h2>
  </div>
);

// ================== PAGES ==================
const Accueil: React.FC<{ setCurrentSection: (s: string) => void }> = ({ setCurrentSection }) => (
  <div className="space-y-8">
    <div className="text-center py-8">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-2">
        Piliarium-App
      </h1>
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
  </div>
);

// ================== APP PRINCIPALE ==================
const App: React.FC = () =>
{
  const [currentSection, setCurrentSection] = useState<'accueil' | 'guides' | 'comparateur' | 'quiz'>('accueil');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sections: Record<string, { title: string; component: JSX.Element; icon: React.ElementType }> = {
    accueil: { title: 'Accueil', component: <Accueil setCurrentSection={setCurrentSection} />, icon: Home },
    guides: { title: 'Guides 3a/3b/3c', component: <div>Guides…</div>, icon: BookOpen },
    comparateur: { title: 'Comparateur', component: <div>Comparateur…</div>, icon: BarChart2 },
    quiz: { title: 'Quiz', component: <div>Quiz…</div>, icon: HelpCircle },
  };

  const NavLink: React.FC<{ sectionKey: string; children: React.ReactNode }> = ({ sectionKey, children }) => (
    <button
      onClick={() =>
      {
        setCurrentSection(sectionKey as any);
        setSidebarOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentSection === sectionKey
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
        <aside
          className={`absolute md:relative z-20 md:z-auto w-64 bg-white dark:bg-gray-800 shadow-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
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
};

export default App;

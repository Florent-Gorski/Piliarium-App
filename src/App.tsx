import React, { useEffect, useMemo, useState } from "react";
import
  {
    Home as HomeIcon,
    BookOpen,
    Map,
    BarChart2,
    Briefcase,
    HelpCircle,
    Shield,
    Moon,
    Sun,
    Menu,
    X,
  } from "lucide-react";

// ⚠️ Imports en exports nommés + chemins exacts d’après ton arbo (voir capture)
import { Guides } from "./pages/Guides";
import { FiscaliteCantons } from "./pages/FiscliteCantons"; // ← fichier: FiscliteCantons.tsx
import { ComparateurPage } from "./pages/ComparateurPage";
import { EtudeCas } from "./pages/EtudeCas";
import { QuizSelection } from "./pages/QuizSelection";
import { ComplianceModule } from "./pages/ComplianceModule";

/* ========================= Accueil ========================= */
const Accueil: React.FC<{ setCurrentSection: (k: string) => void }> = ({
  setCurrentSection,
}) =>
{
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-2">
          Piliarium-App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          L&apos;outil de formation d&apos;élite pour courtiers suisses romands
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setCurrentSection("guides")}
          className="text-left bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <BookOpen className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Découvrir</h3>
          <p className="text-teal-100 text-sm">
            3a/3b/3c — Cadre légal, fiscalité, exceptions.
          </p>
        </button>

        <button
          onClick={() => setCurrentSection("comparateur")}
          className="text-left bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <BarChart2 className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Comparer</h3>
          <p className="text-indigo-100 text-sm">
            Banque vs Assurance — Frais, garanties, rendements.
          </p>
        </button>

        <button
          onClick={() => setCurrentSection("quiz")}
          className="text-left bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <HelpCircle className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-xl font-bold mb-2">S&apos;entraîner</h3>
          <p className="text-pink-100 text-sm">
            Quiz adaptatifs et études de cas pratiques.
          </p>
        </button>
      </div>

      {/* Les deux panneaux demandés sur l'accueil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FiscaliteCantons />
        <ComplianceModule />
      </div>
    </div>
  );
};

/* ========================= App ========================= */
type SectionMeta = {
  title: string;
  component: React.ReactNode;
  icon: React.ElementType; // icônes lucide-react
};

const App: React.FC = () =>
{
  const [currentSection, setCurrentSection] = useState<string>("accueil");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Suivi du thème pour afficher la bonne icône (la classe 'dark' est gérée par main.tsx)
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  useEffect(() =>
  {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    window.addEventListener("storage", (e) =>
    {
      if (e.key === "theme") sync();
    });
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener?.("change", sync);
    // première synchro
    sync();
    return () => mq?.removeEventListener?.("change", sync);
  }, []);

  const toggleTheme = () =>
  {
    const api = (window as any).__toggleTheme as undefined | (() => void);
    if (typeof api === "function") {
      api();
      setIsDark((d) => !d);
      return;
    }
    // Fallback local si l’API globale n’est pas dispo (sécurité)
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    root.classList.toggle("light", !next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch { }
    setIsDark(next);
  };

  const sections: Record<string, SectionMeta> = useMemo(
    () => ({
      accueil: {
        title: "Accueil",
        component: <Accueil setCurrentSection={setCurrentSection} />,
        icon: HomeIcon,
      },
      guides: { title: "Guides 3a/3b/3c", component: <Guides />, icon: BookOpen },
      cantons: {
        title: "Fiscalité Cantonale",
        component: <FiscaliteCantons />,
        icon: Map,
      },
      comparateur: {
        title: "Comparateur",
        component: <ComparateurPage />,
        icon: BarChart2,
      },
      "etudes-de-cas": {
        title: "Études de cas",
        component: <EtudeCas />,
        icon: Briefcase,
      },
      quiz: { title: "Quiz", component: <QuizSelection />, icon: HelpCircle },
      compliance: {
        title: "Compliance",
        component: <ComplianceModule />,
        icon: Shield,
      },
    }),
    []
  );

  const NavLink: React.FC<{
    sectionKey: string;
    children: React.ReactNode;
  }> = ({ sectionKey, children }) => (
    <button
      onClick={() =>
      {
        setCurrentSection(sectionKey);
        setSidebarOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentSection === sectionKey
          ? "bg-teal-500 text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
    >
      {children}
    </button>
  );

  const Current = sections[currentSection];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Sidebar */}
      <aside
        className={`absolute md:relative z-20 md:z-auto w-64 bg-white dark:bg-gray-800 shadow-xl transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-teal-500">Piliarium-App</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-600 dark:text-gray-300"
            aria-label="Fermer la navigation"
          >
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

      {/* Contenu */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-600 dark:text-gray-300"
            aria-label="Ouvrir la navigation"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold">{Current.title}</h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Basculer sombre/clair"
            title="Sombre / clair"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50">
          {Current.component}
        </main>
      </div>
    </div>
  );
};

export default App;

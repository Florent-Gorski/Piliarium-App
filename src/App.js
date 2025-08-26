import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { useEffect, useMemo, useState } from "react";
import { Home as HomeIcon, BookOpen, Map, BarChart2, Briefcase, HelpCircle, Shield, Moon, Sun, Menu, X, } from "lucide-react";
// ⚠️ IMPORTS EN EXPORTS NOMMÉS (conformes à tes fichiers)
import { Guides } from "./pages/Guides";
import { FiscaliteCantons } from "./pages/FiscliteCantons";
import { ComparateurPage } from "./pages/ComparateurPage";
import { EtudeCas } from "./pages/EtudeCas";
import { QuizSelection } from "./pages/QuizSelection";
import { ComplianceModule } from "./pages/ComplianceModule";
// ========================= Accueil =========================
const Accueil = ({ setCurrentSection, }) => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center py-8", children: [_jsx("h1", { className: "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-2", children: "Piliarium-App" }), _jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300", children: "L'outil de formation d'\u00E9lite pour courtiers suisses romands" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("button", { onClick: () => setCurrentSection("guides"), className: "text-left bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1", children: [_jsx(BookOpen, { className: "w-10 h-10 mb-3 opacity-80" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "D\u00E9couvrir" }), _jsx("p", { className: "text-teal-100 text-sm", children: "3a/3b/3c \u2014 Cadre l\u00E9gal, fiscalit\u00E9, exceptions." })] }), _jsxs("button", { onClick: () => setCurrentSection("comparateur"), className: "text-left bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1", children: [_jsx(BarChart2, { className: "w-10 h-10 mb-3 opacity-80" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Comparer" }), _jsx("p", { className: "text-indigo-100 text-sm", children: "Banque vs Assurance \u2014 Frais, garanties, rendements." })] }), _jsxs("button", { onClick: () => setCurrentSection("quiz"), className: "text-left bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1", children: [_jsx(HelpCircle, { className: "w-10 h-10 mb-3 opacity-80" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "S'entra\u00EEner" }), _jsx("p", { className: "text-pink-100 text-sm", children: "Quiz adaptatifs et \u00E9tudes de cas pratiques." })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FiscaliteCantons, {}), _jsx(ComplianceModule, {})] })] }));
};
const App = () => {
    const [currentSection, setCurrentSection] = useState("accueil");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    // --- Gestion robuste de l'icône du thème (suit la classe <html>)
    const [isDark, setIsDark] = useState(() => typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : false);
    useEffect(() => {
        // Sync si changement depuis un autre onglet
        const onStorage = (e) => {
            if (e.key === "theme") {
                setIsDark(document.documentElement.classList.contains("dark"));
            }
        };
        window.addEventListener("storage", onStorage);
        // Sync si media query système change
        const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
        const onMedia = () => {
            // si pas de préférence stockée, certains setups basculent via main.tsx
            setIsDark(document.documentElement.classList.contains("dark"));
        };
        mq?.addEventListener?.("change", onMedia);
        // Première synchro (au cas où)
        setIsDark(document.documentElement.classList.contains("dark"));
        return () => {
            window.removeEventListener("storage", onStorage);
            mq?.removeEventListener?.("change", onMedia);
        };
    }, []);
    const toggleTheme = () => {
        // Utilise l’API globale si main.tsx l’expose, sinon fallback local
        const api = window.__toggleTheme;
        if (typeof api === "function") {
            api();
            setIsDark((d) => !d);
            return;
        }
        // Fallback local (au cas où)
        const root = document.documentElement;
        const nextDark = !root.classList.contains("dark");
        root.classList.toggle("dark", nextDark);
        root.classList.toggle("light", !nextDark);
        try {
            localStorage.setItem("theme", nextDark ? "dark" : "light");
        }
        catch { }
        setIsDark(nextDark);
    };
    const sections = useMemo(() => ({
        accueil: {
            title: "Accueil",
            component: _jsx(Accueil, { setCurrentSection: setCurrentSection }),
            icon: HomeIcon,
        },
        guides: { title: "Guides 3a/3b/3c", component: _jsx(Guides, {}), icon: BookOpen },
        cantons: {
            title: "Fiscalité Cantonale",
            component: _jsx(FiscaliteCantons, {}),
            icon: Map,
        },
        comparateur: {
            title: "Comparateur",
            component: _jsx(ComparateurPage, {}),
            icon: BarChart2,
        },
        "etudes-de-cas": {
            title: "Études de cas",
            component: _jsx(EtudeCas, {}),
            icon: Briefcase,
        },
        quiz: { title: "Quiz", component: _jsx(QuizSelection, {}), icon: HelpCircle },
        compliance: {
            title: "Compliance",
            component: _jsx(ComplianceModule, {}),
            icon: Shield,
        },
    }), []);
    const NavLink = ({ sectionKey, children }) => (_jsx("button", { onClick: () => {
            setCurrentSection(sectionKey);
            setSidebarOpen(false);
        }, className: `flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentSection === sectionKey
            ? "bg-teal-500 text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`, children: children }));
    const Current = sections[currentSection];
    return (_jsxs("div", { className: "flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans", children: [_jsxs("aside", { className: `absolute md:relative z-20 md:z-auto w-64 bg-white dark:bg-gray-800 shadow-xl transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out`, children: [_jsxs("div", { className: "p-4 flex justify-between items-center", children: [_jsx("h1", { className: "text-xl font-bold text-teal-500", children: "Piliarium-App" }), _jsx("button", { onClick: () => setSidebarOpen(false), className: "md:hidden text-gray-600 dark:text-gray-300", "aria-label": "Fermer la navigation", children: _jsx(X, { size: 24 }) })] }), _jsx("nav", { className: "p-4 space-y-2", children: Object.entries(sections).map(([key, { title, icon: Icon }]) => (_jsxs(NavLink, { sectionKey: key, children: [_jsx(Icon, { className: "mr-3", size: 20 }), title] }, key))) })] }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs("header", { className: "flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md", children: [_jsx("button", { onClick: () => setSidebarOpen(true), className: "md:hidden text-gray-600 dark:text-gray-300", "aria-label": "Ouvrir la navigation", children: _jsx(Menu, { size: 24 }) }), _jsx("h2", { className: "text-lg font-semibold", children: Current.title }), _jsx("button", { onClick: toggleTheme, className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700", "aria-label": "Basculer sombre/clair", title: "Sombre / clair", children: isDark ? _jsx(Sun, {}) : _jsx(Moon, {}) })] }), _jsx("main", { className: "flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50", children: Current.component })] })] }));
};
export default App;

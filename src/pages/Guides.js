import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BookOpen } from 'lucide-react';
// Composant générique de carte
const Card = ({ children, className = '', ...props }) => (_jsx("div", { ...props, className: `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`, children: children }));
// Titre avec icône
const Title = ({ children, icon, }) => (_jsxs("div", { className: "flex items-center mb-6", children: [icon, _jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white ml-3", children: children })] }));
// Ligne de vie du 3ᵉ pilier A
const LifeLine3a = () => {
    const etapes = [
        { age: 25, label: 'Ouverture', description: "Éligibilité AVS" },
        { age: 40, label: 'Versements', description: 'Déduction fiscale' },
        { age: 60, label: 'Planification', description: 'Stratégie de retrait' },
        { age: 65, label: 'Retrait', description: 'Imposition du capital' },
    ];
    return (_jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-6 text-gray-700 dark:text-gray-200", children: "\uD83D\uDCCD Ligne de vie du 3\u1D49 pilier A" }), _jsxs("div", { className: "relative pt-8", children: [_jsx("div", { className: "absolute top-14 left-10 right-10 h-1 bg-teal-200 dark:bg-teal-800" }), _jsx("div", { className: "relative flex justify-between items-start", children: etapes.map((etape, index) => (_jsxs("div", { className: "flex flex-col items-center text-center w-24", children: [_jsx("div", { className: "w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-white dark:border-gray-800 mb-2 z-10", children: etape.age }), _jsx("div", { className: "font-semibold text-gray-800 dark:text-white", children: etape.label }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: etape.description })] }, index))) })] })] }));
};
// Page Guides (3a / 3b / 3c)
export const Guides = () => {
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(Title, { icon: _jsx(BookOpen, { size: 32, className: "text-teal-500" }), children: "Guides 3a / 3b / 3c" }), _jsx(LifeLine3a, {}), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4 text-teal-600 dark:text-teal-400", children: "Pilier 3a : La pr\u00E9voyance li\u00E9e" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside", children: [_jsxs("li", { children: [_jsx("strong", { children: "\u00C9ligibilit\u00E9 :" }), " Toute personne avec un revenu soumis \u00E0 l'AVS."] }), _jsxs("li", { children: [_jsx("strong", { children: "Plafonds 2025 :" }), " ", PLAFONDS_2025.salarie.toLocaleString(), " CHF (salari\u00E9s), 20% du revenu net jusqu'\u00E0", ' ', PLAFONDS_2025.independant.toLocaleString(), " CHF (ind\u00E9pendants)."] }), _jsxs("li", { children: [_jsx("strong", { children: "Avantage :" }), " D\u00E9duction du revenu imposable."] }), _jsxs("li", { children: [_jsx("strong", { children: "Retrait anticip\u00E9 :" }), " Achat logement principal, d\u00E9part d\u00E9finitif de Suisse, mise \u00E0 son compte, invalidit\u00E9, rachat LPP."] }), _jsxs("li", { children: [_jsx("strong", { children: "Imposition :" }), " Capital impos\u00E9 s\u00E9par\u00E9ment \u00E0 taux r\u00E9duit."] })] })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400", children: "Pilier 3b : La pr\u00E9voyance libre" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside", children: [_jsxs("li", { children: [_jsx("strong", { children: "Flexibilit\u00E9 :" }), " Pas de plafond de versement, contrat sur mesure."] }), _jsxs("li", { children: [_jsx("strong", { children: "Liquidit\u00E9 :" }), " Rachat possible \u00E0 tout moment selon contrat."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fiscalit\u00E9 :" }), " Pas de d\u00E9duction (sauf exceptions cantonales). Capital exon\u00E9r\u00E9 au terme."] }), _jsxs("li", { children: [_jsx("strong", { children: "Usages :" }), " Protection famille, financement projets, optimisation successorale."] })] })] })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Tableau Comparatif : 3a vs 3b" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left text-gray-500 dark:text-gray-400", children: [_jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3", children: "Caract\u00E9ristique" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-teal-600 dark:text-teal-400", children: "Pilier 3a" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-indigo-600 dark:text-indigo-400", children: "Pilier 3b" })] }) }), _jsx("tbody", { children: comparisonData.map((row, i) => (_jsxs("tr", { className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700", children: [_jsx("th", { scope: "row", className: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white", children: row.feature }), _jsx("td", { className: "px-6 py-4", children: row.p3a }), _jsx("td", { className: "px-6 py-4", children: row.p3b })] }, i))) })] }) })] })] }));
};

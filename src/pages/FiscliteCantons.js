import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Map } from 'lucide-react';
// Composant générique de carte
const Card = ({ children, className = '', ...props }) => (_jsx("div", { ...props, className: `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`, children: children }));
// Titre avec icône
const Title = ({ children, icon, }) => (_jsxs("div", { className: "flex items-center mb-6", children: [icon, _jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white ml-3", children: children })] }));
// Données cantonales
const CANTONS_DATA = {
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
export const FiscaliteCantons = () => {
    const [selectedCanton, setSelectedCanton] = useState('VD');
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(Title, { icon: _jsx(Map, { size: 32, className: "text-teal-500" }), children: "Fiscalit\u00E9 Cantonale" }), _jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "\uD83D\uDDFA\uFE0F Fiscalit\u00E9 cantonale du retrait 3a" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-4", children: "S\u00E9lectionnez un canton pour voir ses sp\u00E9cificit\u00E9s :" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: Object.keys(CANTONS_DATA).map((code) => (_jsx("button", { onClick: () => setSelectedCanton(code), className: `p-3 rounded-lg text-sm font-bold transition-all ${selectedCanton === code
                                                ? 'bg-teal-500 text-white shadow-md'
                                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`, children: code }, code))) })] }), _jsx("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg", children: selectedCanton && (_jsxs(_Fragment, { children: [_jsx("h4", { className: "font-bold text-lg text-gray-800 dark:text-white", children: CANTONS_DATA[selectedCanton].nom }), _jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [_jsxs("p", { children: [_jsx("strong", { className: "text-gray-600 dark:text-gray-300", children: "\u00C9chelonnement max :" }), ' ', CANTONS_DATA[selectedCanton].echelonnement, " an(s)"] }), _jsxs("p", { children: [_jsx("strong", { className: "text-gray-600 dark:text-gray-300", children: "Taux marginal estim\u00E9 :" }), ' ', "~", CANTONS_DATA[selectedCanton].tauxMarginal, "%"] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-100 dark:bg-gray-600 p-2 rounded", children: CANTONS_DATA[selectedCanton].particularites })] })] })) })] })] })] }));
};

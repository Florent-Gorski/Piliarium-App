import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
import { BarChart2, HelpCircle } from 'lucide-react';
// Composant générique de carte
const Card = ({ children, className = '', ...props }) => (_jsx("div", { ...props, className: `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`, children: children }));
// Titre avec icône
const Title = ({ children, icon, }) => (_jsxs("div", { className: "flex items-center mb-6", children: [icon, _jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white ml-3", children: children })] }));
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
export const ComparateurPage = () => {
    const [selectedProviderName, setSelectedProviderName] = useState(PROVIDERS_DATA[0].nom);
    const selectedProvider = PROVIDERS_DATA.find((p) => p.nom === selectedProviderName);
    const radarData = selectedProvider && [
        {
            metric: 'Frais Bas',
            value: selectedProvider.type === 'Assurance'
                ? (5 - selectedProvider.fraisInitiaux) * 20
                : (2 - selectedProvider.fraisGestion) * 50,
        },
        { metric: 'Rendement', value: selectedProvider.rendementNet5ans * 20 },
        { metric: 'Val. Rachat', value: selectedProvider.valeurRachatA3 },
        { metric: 'Flexibilité', value: selectedProvider.flexibilite * 10 },
    ];
    const assurances = PROVIDERS_DATA.filter((p) => p.type === 'Assurance');
    const banques = PROVIDERS_DATA.filter((p) => p.type === 'Banque');
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(Title, { icon: _jsx(BarChart2, { size: 32, className: "text-teal-500" }), children: "Comparateur Banque vs. Assurance" }), _jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Analyse D\u00E9taill\u00E9e par Prestataire" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsx("label", { htmlFor: "provider-select", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Choisir un prestataire :" }), _jsxs("select", { id: "provider-select", value: selectedProviderName, onChange: (e) => setSelectedProviderName(e.target.value), className: "mb-4 p-2 border rounded-md w-full bg-white dark:bg-gray-700 dark:border-gray-600", children: [_jsx("optgroup", { label: "Assurances", children: assurances.map((p) => (_jsx("option", { value: p.nom, children: p.nom }, p.nom))) }), _jsx("optgroup", { label: "Banques & Plateformes", children: banques.map((p) => (_jsx("option", { value: p.nom, children: p.nom }, p.nom))) })] }), selectedProvider && (_jsxs("div", { className: "text-sm space-y-1 mb-4", children: [selectedProvider.type === 'Assurance' && (_jsxs("p", { children: [_jsx("strong", { children: "Frais initiaux:" }), " ", selectedProvider.fraisInitiaux, "%"] })), _jsxs("p", { children: [_jsx("strong", { children: "Frais gestion:" }), " ", selectedProvider.fraisGestion, "%"] }), selectedProvider.type === 'Assurance' && (_jsxs("p", { children: [_jsx("strong", { children: "Rachat \u00E0 3 ans:" }), " ", selectedProvider.valeurRachatA3, "%"] })), _jsxs("p", { children: [_jsx("strong", { children: "Rendement 5 ans:" }), " ", selectedProvider.rendementNet5ans, "%"] })] })), selectedProvider && selectedProvider.redFlags.length > 0 && (_jsxs("div", { className: "p-2 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded", children: [_jsxs("div", { className: "text-red-800 dark:text-red-300 text-sm font-semibold flex items-center", children: [_jsx(HelpCircle, { className: "w-4 h-4 mr-1" }), " Red Flags"] }), selectedProvider.redFlags.map((flag, i) => (_jsxs("div", { className: "text-red-700 dark:text-red-400 text-xs mt-1", children: ["\u2022 ", flag] }, i)))] }))] }), _jsx("div", { className: "md:col-span-2", children: radarData && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(RadarChart, { data: radarData, children: [_jsx(PolarGrid, {}), _jsx(PolarAngleAxis, { dataKey: "metric", tick: { fontSize: 12, fill: 'currentColor' } }), _jsx(PolarRadiusAxis, { domain: [0, 100], tick: false }), _jsx(Radar, { dataKey: "value", stroke: selectedProvider?.type === 'Banque' ? '#6366f1' : '#ec4899', fill: selectedProvider?.type === 'Banque' ? '#6366f1' : '#ec4899', fillOpacity: 0.6 })] }) })) })] })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "\uD83D\uDCC8 Frais de gestion vs. Rendement net" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(ScatterChart, { children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { type: "number", dataKey: "fraisGestion", name: "Frais de gestion", unit: "%", tick: { fill: 'currentColor' } }), _jsx(YAxis, { type: "number", dataKey: "rendementNet5ans", name: "Rendement net", unit: "%", tick: { fill: 'currentColor' } }), _jsx(Tooltip, { cursor: { strokeDasharray: '3 3' }, content: ({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (_jsxs("div", { className: "bg-white dark:bg-gray-800 p-2 border rounded shadow-lg", children: [_jsx("p", { className: "font-bold", children: data.nom }), _jsxs("p", { className: "text-sm", children: ["Frais: ", data.fraisGestion, "%"] }), _jsxs("p", { className: "text-sm", children: ["Rendement: ", data.rendementNet5ans, "%"] })] }));
                                        }
                                        return null;
                                    } }), banques.map((p) => (_jsx(Scatter, { data: [p], fill: "#6366f1", name: p.nom }, p.nom))), assurances.map((p) => (_jsx(Scatter, { data: [p], fill: "#ec4899", name: p.nom }, p.nom)))] }) }), _jsxs("div", { className: "flex justify-center items-center space-x-4 mt-4 text-sm", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-indigo-500 mr-2" }), "Banque"] }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-pink-500 mr-2" }), "Assurance"] })] }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-2 text-center", children: "\uD83D\uDCA1 Id\u00E9al : en haut \u00E0 gauche (faibles frais, bon rendement)" })] })] }));
};

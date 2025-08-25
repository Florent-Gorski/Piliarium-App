import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Briefcase } from 'lucide-react';
// Composant générique de carte
const Card = ({ children, className = '', ...props }) => (_jsx("div", { ...props, className: `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`, children: children }));
// Titre avec icône
const Title = ({ children, icon, }) => (_jsxs("div", { className: "flex items-center mb-6", children: [icon, _jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white ml-3", children: children })] }));
// Données
const PLAFONDS_2025 = {
    salarie: 7258,
    independant: 36288,
};
const CANTONS_DATA = {
    VD: { nom: 'Vaud', echelonnement: 3, tauxMarginal: 42 },
    GE: { nom: 'Genève', echelonnement: 3, tauxMarginal: 45 },
    VS: { nom: 'Valais', echelonnement: 5, tauxMarginal: 38 },
    FR: { nom: 'Fribourg', echelonnement: 1, tauxMarginal: 40 },
    NE: { nom: 'Neuchâtel', echelonnement: 1, tauxMarginal: 43 },
    JU: { nom: 'Jura', echelonnement: 1, tauxMarginal: 41 },
};
// === PAGE ÉTUDE DE CAS ===
export const EtudeCas = () => {
    const [canton, setCanton] = useState('VD');
    const [statut, setStatut] = useState('salarie');
    const [revenu, setRevenu] = useState(80000);
    const [recommendation, setRecommendation] = useState('');
    const [showEvaluation, setShowEvaluation] = useState(false);
    // Projection capitalisé
    const calculateProjection = (versementAnnuel, rendement, annees) => {
        return versementAnnuel * (((1 + rendement / 100) ** annees - 1) / (rendement / 100));
    };
    // Économie fiscale annuelle
    const calculateTaxSaving = () => {
        const plafond = statut === 'salarie'
            ? PLAFONDS_2025.salarie
            : Math.min(revenu * 0.2, PLAFONDS_2025.independant);
        return plafond * (CANTONS_DATA[canton].tauxMarginal / 100);
    };
    // Évaluer la reco
    const evaluateRecommendation = () => {
        let note = 5;
        let feedback = [];
        if (recommendation.toLowerCase().includes('échelonnement') && ['VD', 'GE', 'VS'].includes(canton)) {
            note += 2;
            feedback.push("✅ Bon: Stratégie d'échelonnement fiscal mentionnée.");
        }
        else if (!['VD', 'GE', 'VS'].includes(canton) &&
            recommendation.toLowerCase().includes('échelonnement')) {
            feedback.push("⚠️ Attention: L'échelonnement n'est pas optimal dans ce canton.");
        }
        else {
            feedback.push("❌ Manque: Stratégie fiscale de retrait absente.");
        }
        if (recommendation.toLowerCase().includes('frais')) {
            note += 1;
            feedback.push('✅ Bon: Sensibilité aux frais démontrée.');
        }
        if (recommendation.toLowerCase().includes('banque') && recommendation.toLowerCase().includes('assurance')) {
            note += 2;
            feedback.push('✅ Excellent: Mix banque/assurance bien considéré.');
        }
        else {
            feedback.push('⚠️ Manque: Pas de comparaison claire banque vs assurance.');
        }
        return { note: Math.min(note, 10), feedback };
    };
    const plafondApplicable = statut === 'salarie'
        ? PLAFONDS_2025.salarie
        : Math.min(revenu * 0.2, PLAFONDS_2025.independant);
    const economieImpot = calculateTaxSaving();
    const capitalA65 = calculateProjection(plafondApplicable, 4, 25);
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(Title, { icon: _jsx(Briefcase, { size: 32, className: "text-teal-500" }), children: "\u00C9tude de cas pratique" }), _jsxs(Card, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-2", children: "Canton" }), _jsx("select", { value: canton, onChange: (e) => setCanton(e.target.value), className: "w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600", children: Object.entries(CANTONS_DATA).map(([code, data]) => (_jsx("option", { value: code, children: data.nom }, code))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-2", children: "Statut" }), _jsxs("select", { value: statut, onChange: (e) => setStatut(e.target.value), className: "w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600", children: [_jsx("option", { value: "salarie", children: "Salari\u00E9" }), _jsx("option", { value: "independant", children: "Ind\u00E9pendant" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-2", children: "Revenu (CHF)" }), _jsx("input", { type: "number", value: revenu, onChange: (e) => setRevenu(Number(e.target.value)), className: "w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" })] })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6", children: [_jsx("h4", { className: "font-semibold mb-2", children: "\uD83D\uDCCA Situation calcul\u00E9e" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Plafond 3a:" }), " ", plafondApplicable.toLocaleString(), " CHF"] }), _jsxs("div", { children: [_jsx("strong", { children: "\u00C9conomie imp\u00F4t/an:" }), " ", Math.round(economieImpot).toLocaleString(), " CHF"] }), _jsxs("div", { children: [_jsx("strong", { children: "Capital estim\u00E9 \u00E0 65 ans:" }), " ", Math.round(capitalA65).toLocaleString(), " CHF"] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-2", children: "Votre recommandation :" }), _jsx("textarea", { value: recommendation, onChange: (e) => {
                                    setRecommendation(e.target.value);
                                    setShowEvaluation(false);
                                }, className: "w-full p-3 border rounded-md h-24 bg-white dark:bg-gray-700 dark:border-gray-600", placeholder: "Ex: Je recommande un mix 70% banque 3a, 30% assurance 3a, avec \u00E9chelonnement sur 3 ans..." })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { onClick: () => setShowEvaluation(true), disabled: !recommendation.trim(), className: "px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors", children: "\u00C9valuer ma recommandation" }) }), showEvaluation && (_jsxs("div", { className: "mt-6 bg-teal-50 dark:bg-gray-700/80 p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-teal-800 dark:text-teal-300 mb-2", children: "\uD83C\uDFAF \u00C9valuation du Mentor" }), (() => {
                                const { note, feedback } = evaluateRecommendation();
                                return (_jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold mb-2", children: ["Note: ", note, "/10"] }), _jsx("ul", { className: "text-sm space-y-1 list-disc list-inside", children: feedback.map((item, i) => (_jsx("li", { children: item }, i))) }), _jsxs("div", { className: "mt-3 text-sm text-teal-700 dark:text-teal-300", children: [_jsx("strong", { children: "Am\u00E9lioration:" }), ' ', note < 8
                                                    ? 'Pensez toujours à comparer frais nets, garanties et stratégie fiscale cantonale.'
                                                    : 'Excellent travail !'] })] }));
                            })()] }))] })] }));
};

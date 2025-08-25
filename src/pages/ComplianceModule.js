import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Shield } from 'lucide-react';
// Composant générique de carte
const Card = ({ children, className = '', ...props }) => (_jsx("div", { ...props, className: `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`, children: children }));
// Titre avec icône
const Title = ({ children, icon, }) => (_jsxs("div", { className: "flex items-center mb-6", children: [icon, _jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-white ml-3", children: children })] }));
// === PAGE COMPLIANCE ===
export const ComplianceModule = () => {
    const complianceItems = [
        'KYC client réalisé (profil risque, horizon, capacité)',
        'IPID remis avant signature',
        'Conditions générales expliquées',
        'Risques des unités de compte mentionnés',
        'Frais nets vs bruts clarifiés',
        'Alternatives comparées (banque vs assurance)',
        'Archivage 10 ans prévu',
    ];
    const [checkedItems, setCheckedItems] = useState({});
    const toggleCheck = (index) => setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(Title, { icon: _jsx(Shield, { size: 32, className: "text-teal-500" }), children: "Compliance FINMA / LBA" }), _jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Check-list de conformit\u00E9" }), _jsx("div", { className: "space-y-3", children: complianceItems.map((item, index) => (_jsxs("div", { className: "flex items-center cursor-pointer", onClick: () => toggleCheck(index), children: [_jsx("div", { className: `mr-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checkedItems[index]
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-gray-300 dark:border-gray-500'}`, children: checkedItems[index] && '✓' }), _jsx("span", { className: `${checkedItems[index]
                                        ? 'line-through text-gray-500'
                                        : 'text-gray-700 dark:text-gray-300'}`, children: item })] }, index))) })] }), _jsxs("div", { className: "p-4 bg-yellow-50 dark:bg-gray-700/50 border-l-4 border-yellow-400", children: [_jsx("h4", { className: "font-bold text-yellow-800 dark:text-yellow-300", children: "\u26A0\uFE0F Erreurs typiques du d\u00E9butant" }), _jsxs("ul", { className: "text-sm text-yellow-700 dark:text-yellow-200 mt-2 space-y-1 list-disc list-inside", children: [_jsx("li", { children: "Confondre banque 3a (liquidit\u00E9) et assurance 3a (garanties)." }), _jsx("li", { children: "Ignorer les frais d\u2019acquisition vs frais de gestion." }), _jsx("li", { children: "Promettre des rendements bruts au lieu de nets." }), _jsx("li", { children: "Proposer un retrait unique au lieu d\u2019un \u00E9chelonnement fiscal." })] })] })] }));
};

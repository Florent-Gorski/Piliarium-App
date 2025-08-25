import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/Button';
export const Home = () => {
    return (_jsxs("div", { className: "space-y-6 text-center", children: [_jsx("h2", { className: "text-3xl font-extrabold text-gray-800 dark:text-gray-100", children: "Bienvenue sur Piliarium-App \uD83D\uDC4B" }), _jsx("p", { className: "text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto", children: "L\u2019outil de formation interactif pour les courtiers suisses romands. Explorez les guides sur le 3\u1D49 pilier, comparez les solutions, testez vos connaissances avec des quiz, et entra\u00EEnez-vous avec des \u00E9tudes de cas r\u00E9alistes." }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { onClick: () => alert('🚀 En route vers la formation !'), children: "Commencer la formation" }) })] }));
};

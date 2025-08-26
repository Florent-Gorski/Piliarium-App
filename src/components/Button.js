import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ loading = false, children, ...rest }) => {
    return (_jsx("button", { ...rest, disabled: loading || rest.disabled, className: "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium\r\n                 bg-brand text-white hover:opacity-90 disabled:opacity-50 transition-colors", children: loading ? '…' : children }));
};

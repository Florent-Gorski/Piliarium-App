import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ loading = false, children, ...rest }) =>
{
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium
                 bg-brand text-white hover:opacity-90 disabled:opacity-50 transition-colors"
    >
      {loading ? '…' : children}
    </button>
  );
};

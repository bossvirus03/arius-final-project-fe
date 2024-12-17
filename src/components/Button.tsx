import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-[#B88E2F] flex justify-center items-center font-semibold w-[215px] h-[64px] rounded-[15px] ${className}`}
      {...props} // Spread all props, including onClick
    >
      {children}
    </button>
  );
};

export default Button;

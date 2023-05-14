import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode} from 'react';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode,
    typeBtn?: "success" | "light"
}
const Button: FC<IButtonProps> = ({children, typeBtn = "success", ...props}) => {
    return (
        <button {...props} type="button" className={`btn btn-${typeBtn}`}>{children}</button>
    );
};

export default Button;
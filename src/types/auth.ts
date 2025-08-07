// loginForm
export interface LoginFormProps {
    label: string;
    placeholder: string;
    iconname: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}


// button
export interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}


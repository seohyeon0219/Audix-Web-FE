// loginForm
export interface FormProps {
    label: string;
    placeholder: string;
    iconname: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
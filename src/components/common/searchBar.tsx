import Icon from '../common/icon';

interface SearchBarProps {
    placeholder: string;
    iconname: string;
}

export default function SearchBar({ 
    placeholder, 
    iconname 
}: SearchBarProps) {
    return (
        <div className="flex items-center bg-white w-80 h-12 rounded-3xl">
            <input 
                className='w-64 h-12 text-login-gray pl-6'
                placeholder={placeholder}
            ></input>
            <Icon 
                iconname= {iconname} 
                size={26} 
                weight={200} 
                className="pl-2 text-login-gray"
                />
        </div>
    )
}
type IconProps = {
    iconname: string;
    size?: string | number;
    color?: string;
    weight?: number;
    fill?: 0 | 1;
    className?: string;
};

export default function Icon ({ 
    iconname, 
    size = 18, 
    color = "#B9B9B9", 
    weight = 400, 
    fill = 0, 
    className = ''
}: IconProps) {
    return (
        <span 
            className={`material-symbols-outlined ${className}`} 
            style={{ 
                fontSize: size,
                color: color,    
                fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
 }}
        >
            {iconname}
        </span>
    )
}

// IconOption.tsx

import React from 'react';
import * as Icon from '@phosphor-icons/react';

interface IconOptionProps {
    icon: keyof typeof Icon;
    color: string;
    selected: boolean;
}

const IconOption: React.FC<IconOptionProps> = ({ icon, color, selected }) => {
    const IconComponent: React.ElementType = Icon[icon];

    return (
        <div className={`inline-flex justify-center items-center border-4 ${selected ? 'border-blue-500' : 'border-transparent'}`}>
            <IconComponent className="w-12 h-12" style={{ color: color }} />
        </div>
    );
}

export default IconOption;

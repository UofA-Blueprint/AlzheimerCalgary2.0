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
    const colorVariants: { [key: string]: any } = {
        blue: 'border-blue-500',
        red: 'border-red-500',
        yellow: 'border-yellow-500',
      }

    return (
        <div className={`inline-flex justify-center items-center rounded-full border-4 ${selected ? `${colorVariants[color]}` : 'border-transparent'}`}>
            <IconComponent className={`rounded-full w-12 h-12`}/>
        </div>
    );
}

export default IconOption;

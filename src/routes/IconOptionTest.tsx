import React from 'react';
import IconOption from '@/components/IconOption';

const IconOptionTest: React.FC = () => {
    return (
        <div>
            <h1>Icon Options</h1>
            <IconOption icon="ArrowDown" color="red" selected={true} />
            
            <IconOption icon="Camera" color="blue" selected={true} />
            <IconOption icon="Camera" color="green" selected={false} />
        </div>
    );
};

export default IconOptionTest;
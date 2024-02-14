import React from 'react';
import * as Icon from '@phosphor-icons/react'

//define the prop types for the component
interface Props {
    children?: string; // Change type to React.ReactNode to accept any valid React node
    backgroundColor: 'tulip' | 'gold' | 'lime' | 'jade' | 'water' | 'air' | 'lilac' | 'candy'; // Define a specific set of acceptable values
  }


const ProfilePictures=(props:Props)=>{
    
    // Function to generate the background color class
    const getBackgroundColorClass = (color: string) => {
        return `bg-profile-${color}`;
    };

    return(<div>
        <div className="overflow-hidden justify-center items-center rounded-full w-32 h-32">
            {props.children?
            <img className="object-center w-32 h-32" src={props.children} alt="Profile Pic" />
                :
                <div className={`bg-profile-${props.backgroundColor} flex justify-center items-center rounded-full w-32 h-32`}>
                <Icon.PawPrint size={120} color={'white'} /> {/* Set color to 'white' for the icon */}
                </div>
            }
        {/* <img className="object-center w-32 h-32" src={props.children} alt="Profile Pic" />     */}
        {/* <Heart size={32} weight= "fill" color={props.backgroundColor} /> */}
        
      </div>
      
        {/* <h1>{props.backgroundColor}</h1> */}
    </div>);
};

export default ProfilePictures;
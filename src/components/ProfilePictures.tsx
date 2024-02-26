import * as Icon from '@phosphor-icons/react'
import { ReactNode } from 'react';
//define the prop types for the component
interface Props {
    children: ReactNode; 
    backgroundColor: 'tulip' | 'gold' | 'lime' | 'jade' | 'water' | 'air' | 'lilac' | 'candy'; 
  }


const ProfilePictures=(props:Props)=>{
    
    const backgroundColor= `bg-profile-${props.backgroundColor}`
    // return(<div>
    //     <div className="overflow-hidden justify-center items-center rounded-full w-32 h-32">
    //         {props.children?
    //         <img className="object-center w-32 h-32" src={props.children} alt="Profile Pic" />
    //             :
    //             <div className={`bg-profile-${props.backgroundColor} flex justify-center items-center rounded-full w-32 h-32`}>
    //             <Icon.PawPrint size={120} color={'white'} /> 
    //             </div>
    //         }
        
    //   </div>
      
    // </div>);

    return(<div>
        <div className={`bg-profile-${props.backgroundColor}  object-fill object-center flex overflow-hidden justify-center items-center rounded-full w-32 h-32`}>
        {props.children}
        </div>
    </div>)
};

export default ProfilePictures;
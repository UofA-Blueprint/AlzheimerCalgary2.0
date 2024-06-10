import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface OverlayProps {  
    className?: string;
    nav: boolean;
    children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({className, nav, children}) => {

      return(

        <div className={`bg-zinc-400 h-screen w-screen items-center ${className}`}>
            <div className="flex h-screen w-screen flex-row justify-between items-center">
                {nav ? <ArrowLeft color="black" weight="thin" size={150} />: <></>}
                {children}
                {nav ? <ArrowRight color="black" weight="thin" size={150} /> : <></>}
            </div>
        </div>
    
        )

}

export default Overlay
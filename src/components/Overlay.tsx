import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface OverlayProps {  
    className?: string;
    nav: boolean;
    children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({className, nav, children}) => {

      return(

        <div className={`bg-zinc-400 h-screen w-screen items-center ${className}`}>
            <div className="flex h-screen w-screen flex-row justify-between items-center">
                {nav ? <ArrowBackIcon/> : <></>}
                {children}
                {nav ? <ArrowForwardIcon/> : <></>}
            </div>
        </div>
    
        )

}

export default Overlay
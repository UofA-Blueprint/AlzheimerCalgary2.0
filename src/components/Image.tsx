
interface ImageProps {
    url: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({url, alt, className}) => {

      return(

        <div className="h-svh flex justify-center items-center">
            <img className={`w-6/12 ${className}`} src={url} style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center", alignItems: "center"}} alt={alt}/>
        </div> 
    
        )

}

export default Image
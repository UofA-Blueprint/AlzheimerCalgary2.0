import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/styles/images.css";
import old1 from "../assets/images/old1.jpg";
import old2 from "../assets/images/old2.jpg";
import old3 from "../assets/images/old3.jpg";
import old4 from "../assets/images/old4.jpg";
import old5 from "../assets/images/old5.jpg";

interface ImageProps {
    deviceType: string
}

const Image: React.FC<ImageProps> = ({deviceType}) => {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          //slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          //slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          //slidesToSlide: 1 // optional, default to 1.
        }
      };

      const imagesPool = [
        old1,
        old2,
        old3,
        old4,
        old5
      ];
      
      return(
    <div className="absolute w-full h-full bg-gray-800 bg-opacity-75 top-0">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        //autoPlay={deviceType !== "mobile" ? true : false}
        //autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        partialVisible={false}
        transitionDuration={500}
        containerClass="carousel"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //renderDotsOutside={true}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
      >
        {imagesPool.map((image, index) => 
        <div className="h-svh flex justify-center items-center">
            <img className="w-6/12" src={image} key={index} style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center", alignItems: "center"}} alt={'hello'}/>
        </div>    
            )}
        
      </Carousel>
      </div>)

}

export default Image
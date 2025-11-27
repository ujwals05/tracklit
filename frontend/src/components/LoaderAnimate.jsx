import Lottie from "lottie-react";
import loadingAnimation from "./../assets/animate/trackitload.json";

const LoaderAnimate = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-40 h-40"
      />
    </div>
  );
};

export default LoaderAnimate;

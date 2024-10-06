import Image from "next/image";
import logo from "@/public/images/logo.png";

const PulseLogoLoader = () => {
  return (
    <div className="pulse-logo-wraper">
      <div className="pulse-img">
        <Image src={logo} alt="loading-icon" />
      </div>
    </div>
  );
};

export default PulseLogoLoader;

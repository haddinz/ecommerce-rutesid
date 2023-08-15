import { Link } from "react-router-dom";
import Icon from "./custom/icon";

function Footer() {
  return (
    <div className="w-full bg-gray-900 text-gray-300 pt-10 pb-5 mt-10">
      <div className="container">
        <div className="grid place-items-center">
          <h3 className="h3">VITE.ID</h3>
          <p className="text-xs md:text-sm text-center w-full md:w-[450px] mb-5">
            Vite ID is an ecommerce website built with a full-stack approach,
            using Vite for the frontend and Node.js as the backend. Please keep
            the embedded link below to stay connected
          </p>
          <div className="space-x-3 md:space-x-6 flex">
            <Link to={'https://www.facebook.com/hadin.hadin.313371'} target="_blank">
              <Icon.Facebook />
            </Link>
            <Link to={'https://www.linkedin.com/in/hajrul-ahmad-harudin/'} target="_blank">
              <Icon.Linkedin />
            </Link>
          </div>
        </div>
        <div className="border-t-2 w-full text-center mt-6 py-3 border-gray-700">
          <p className="text-sm">@All Right Reserved 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

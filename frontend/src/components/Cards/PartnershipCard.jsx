import { Link } from "react-router-dom";

const PartnershipCard = ({ logo, link, name }) => {
  return (
    <Link to={link} className="max-w-[100px] md:max-w-[200px] w-full  rounded">
      <div className="flex flex-col justify-center items-center">
        <img
          src={logo}
          alt={name}
          className="w-full h-[80px] md:h-[100px] object-contain "
        />
      </div>
    </Link>
  );
};
export default PartnershipCard;

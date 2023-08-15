import { Link } from "react-router-dom";


function Hanger({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Link to={link ? link : '#'} className="text-color30 font-semibold text-sm md:text-base">
      {children}
    </Link>
  );
}

export default Hanger;

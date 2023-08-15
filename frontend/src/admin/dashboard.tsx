import { Link, useNavigate } from "react-router-dom";
import ButtonAdmin from "../../components/admin/buttonAdmin";
import Icon from "../../components/custom/icon";
import { useContext, useEffect } from "react";
import { Store } from "../../utils/store";

function DashboardAdmin({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { state: { userInfo } } = useContext(Store);
  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div className="grid grid-cols-5 font-poppins text-white">
      <div className="col-span-1">
        <nav className="flex justify-center items-center h-[80px] bg-color60 border-b-2 border-white border-opacity-30">
          <Link to="/" className="font-bold">
            vite.id
          </Link>
        </nav>
        <div className="bg-color60 bg-opacity-90 py-10 max-h-[88vh] lg:overflow-y-auto no-scrollbar">
          <div className="mb-10">
            <p className="ml-10 mb-5">Dashboard</p>
            <ButtonAdmin slug="order" icon={<Icon.Square />}>
              Orders
            </ButtonAdmin>
            <ButtonAdmin slug="product">Products</ButtonAdmin>
            <ButtonAdmin slug="user" icon={<Icon.Users />}>Users</ButtonAdmin>
          </div>
          <div className="mb-10">
            <p className="ml-10 mb-5">Apss</p>
            <ButtonAdmin slug="inbox">Inbox</ButtonAdmin>
            <ButtonAdmin slug="ticket">Ticket</ButtonAdmin>
            <ButtonAdmin slug="extra">Extra</ButtonAdmin>
          </div>
          <div className="mb-10">
            <p className="ml-10 mb-5">Element</p>
            <ButtonAdmin slug="inbox">UI Element</ButtonAdmin>
            <ButtonAdmin slug="inbox">Dashboard Element</ButtonAdmin>
            <ButtonAdmin slug="inbox">Card Element</ButtonAdmin>
            <ButtonAdmin slug="inbox">Side Bar Element</ButtonAdmin>
            <ButtonAdmin slug="inbox">Page Layout Element</ButtonAdmin>
          </div>
        </div>
      </div>

      <div className="col-span-4 bg-color60 bg-opacity-95 px-10 max-h-[100vh] overflow-y-auto no-scrollbar">
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;

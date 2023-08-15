/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useState, useEffect } from "react";
import DashboardAdmin from "./dashboard";
import { Store } from "../../utils/store";
import Icon from "../../components/custom/icon";
import SearchBox from "../../components/admin/searchBox";
import { useLocation } from "react-router-dom";
import MessageBox from "../../components/custom/message";
import Loading from "../../components/custom/loading";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import {
  GetUserIDAdmin,
  GetUserQueryAdmin,
  PutUserAdminMutation,
} from "../../components/hook/userHooks";
import { toast } from "react-toastify";

function Users() {
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState<string>();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query") || "all";

  //=============================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //=============================================================

  const {
    state: { userInfo },
  } = useContext(Store);

  //=============================================================

  const { data, isLoading, error } = GetUserQueryAdmin({
    query,
  });
  const { data: dataUser } = GetUserIDAdmin(userID ? userID : "");
  const { mutateAsync: updateAdmin } = PutUserAdminMutation();

  //=============================================================

  useEffect(() => {
    if (dataUser) {
      setName(dataUser.name);
      setEmail(dataUser.email);
    }
  }, [dataUser]);
  const detailsHandler = async (iduser?: string) => {
    setOpen(!open);
    setUserID(iduser);
  };
  const changeHandler = async (admin: boolean) => {
    try {
      console.log('Apakah jadi Admin:' ,!admin)
      await updateAdmin({ _id: dataUser!._id, name, email, isAdmin: !admin });
      // navigate('/admin/order')
      toast.success("User Updated Successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(getError(error as ApiError), { autoClose: 1000 });
    }
  };

  //=============================================================

  return (
    <DashboardAdmin>
      <nav className="grid grid-cols-3 h-[80px] w-full">
        <nav className="col-span-1 flex items-center">
          <h3 className="font-semibold">Order Dashboard</h3>
        </nav>

        <nav className="col-span-2 flex items-center justify-end space-x-5">
          <div className="w-full">
            <SearchBox slug="user" />
          </div>
          <div>
            <Icon.Notification />
          </div>
          <div>{userInfo?.name}</div>
        </nav>
      </nav>

      <div className="mt-10 mb-5">
        <h3>
          {data?.countUsers === 0 || typeof data === "undefined"
            ? "No User Displaying"
            : "Displaying " + data?.countUsers + " Users"}
        </h3>
      </div>

      {isLoading ? (
        <Loading.Spin />
      ) : error ? (
        <MessageBox>{getError(error as ApiError)}</MessageBox>
      ) : (
        <div>
          <div className="gradient mb-5">
            <div className="bg-color60 rounded-lg">
              <div className="bg-color10 bg-opacity-20">
                <div className="grid grid-cols-5 h-[60px] place-content-center gap-5 px-5">
                  <div className="col-span-2">NAME</div>
                  <div>EMAIL</div>
                  <div>ADMIN</div>
                  <div>ACTION</div>
                </div>
              </div>
            </div>
          </div>
          {data?.users.length === 0 ||
            (typeof data === "undefined" && (
              <MessageBox>User Not Found</MessageBox>
            ))}
          {data?.users.map((user) => (
            <div key={user.name} className="hover:gradient mb-2 text-sm">
              <div className="bg-color60 rounded-lg">
                <div className="hover:bg-color10 cursor-pointer duration-300 md:hover:scale-105 rounded-lg bg-opacity-70">
                  <div className="grid grid-cols-5 px-5 py-4 items-center gap-5">
                    <div className="overflow-hidden col-span-2">
                      {user.name}
                    </div>
                    <div className="overflow-hidden">{user.email}</div>
                    <div>{user.isAdmin ? "Admin" : "User"}</div>
                    <div>
                      <button
                        onClick={() => detailsHandler(user._id)}
                        className="text-color30"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div
          onClick={() => detailsHandler()}
          className="w-full h-[100vh] fixed top-0 right-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
        >
          <div className="gradient h-[250px] min-w-[400px]">
            {dataUser && (
              <div className="bg-color60 rounded-lg h-full w-full">
                <div className="bg-color10 bg-opacity-30 rounded-lg h-full w-full p-5">
                  <div className="mb-3 flex justify-between px-2">
                    {dataUser.isAdmin ? (
                      <div className="text-lg font-semibold ">
                        Information Admin
                      </div>
                    ) : (
                      <div className="text-lg font-semibold ">
                        Information User
                      </div>
                    )}
                    <div className="cursor-pointer">
                      <Icon.Times />
                    </div>
                  </div>
                  <div className="flex items-center w-full border-white border-opacity-30 border-2 rounded-lg p-3">
                    <Icon.Users />
                    <div className="ml-5 text-sm">
                      <p>{dataUser.name}</p>
                      <p>{dataUser.email}</p>
                      <p className="mt-2 text-color30">({dataUser._id})</p>
                    </div>
                  </div>
                  {dataUser.isAdmin ? (
                    <button
                      onClick={() => changeHandler(dataUser.isAdmin)}
                      className=" bg-color30 w-full p-3 my-4 rounded-lg hover:scale-105 hover:bg-color10"
                    >
                      Appointing {dataUser.name} as an user
                    </button>
                  ) : (
                    <button
                      onClick={() => changeHandler(dataUser.isAdmin)}
                      className=" bg-color10 w-full p-3 my-4 rounded-lg hover:scale-105 hover:bg-color30"
                    >
                      Appointing {dataUser.name} as an admin
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardAdmin>
  );
}

export default Users;

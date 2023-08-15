import { useContext } from "react";
import DashboardAdmin from "./dashboard";
import { Store } from "../../utils/store";
import Icon from "../../components/custom/icon";
import SearchBox from "../../components/admin/searchBox";
import { GetOrderQueryAdmin } from "../../components/hook/orderHooks";
import Hanger from "../../components/custom/hanger";
import { useLocation } from "react-router-dom";
import MessageBox from "../../components/custom/message";
import Loading from "../../components/custom/loading";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";

function Orders() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query") || "all";

  //=============================================================

  const {
    state: { userInfo },
  } = useContext(Store);

  //=============================================================

  const { data, isLoading, error } = GetOrderQueryAdmin({
    query,
  });

  //=============================================================
  return (
    <DashboardAdmin>
      <nav className="grid grid-cols-3 h-[80px] w-full">
        <nav className="col-span-1 flex items-center">
          <h3 className="font-semibold">Order Dashboard</h3>
        </nav>

        <nav className="col-span-2 flex items-center justify-end space-x-5">
          <div className="w-full">
            <SearchBox slug="order"/>
          </div>
          <div>
            <Icon.Notification />
          </div>
          <div>{userInfo?.name}</div>
        </nav>
      </nav>

      <div className="mt-10 mb-5">
        <h3>
          {data?.countOrders === 0 || typeof data === "undefined"
            ? "No Orders Displaying"
            : "Displaying " + data?.countOrders + " Orders"}
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
                <div className="grid grid-cols-8 h-[60px] place-content-center gap-5 px-5">
                  <div className="col-span-2">ID</div>
                  <div>NAME</div>
                  <div>DATE</div>
                  <div>TOTAL</div>
                  <div>PAID</div>
                  <div>DELIVERY</div>
                  <div className="text-end">ACTION</div>
                </div>
              </div>
            </div>
          </div>
          {data?.orders.length === 0 && (
            <MessageBox>Order Not Found</MessageBox>
          )}
          {data?.orders.map((order) => (
            <div key={order._id} className="hover:gradient mb-2 text-sm">
              <div className="bg-color60 rounded-lg">
                <div className="hover:bg-color10 cursor-pointer duration-300 md:hover:scale-105 rounded-lg bg-opacity-70">
                  <div className="grid grid-cols-8 px-5 py-4 items-center gap-5">
                    <div className="col-span-2">{order._id}</div>
                    <div>
                      {order.shippingAddress.fullName}
                    </div>
                    <div>{order.createdAt.substring(0, 10)}</div>
                    <div>$ {order.totalPrice}</div>
                    <div className="text-xs">
                      {order.isPaid ? (
                        <div className="py-2 px-2 bg-green-600 text-green-200 text-center rounded-lg">
                          {order.paidAt.substring(0, 10)}
                        </div>
                      ) : (
                        <div className="py-2 px-2 bg-rose-600 text-rose-200 rounded-lg text-center">
                          UNPAID
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-center">
                      {order.isDelivered ? (
                        <div className="py-2 px-2 bg-green-600 text-green-200 rounded-lg">
                          {order.deliveredAt.substring(0, 10)}
                        </div>
                      ) : order.isPaid ? (
                        <div className="py-2 px-2 bg-amber-600 text-rose-200 rounded-lg">
                          UNDER DELIVERY
                        </div>
                      ) : (
                        <div className="py-2 px-2 bg-rose-600 text-rose-200 rounded-lg">
                          NOT YET SHIPPED
                        </div>
                      )}
                    </div>
                    <div className="text-end">
                      <Hanger link={`/order/id/${order._id}`}>Details</Hanger>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardAdmin>
  );
}

export default Orders;

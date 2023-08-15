import { Order } from "../types/Order";
import Hanger from "./custom/hanger";

function HistoryCard({ orderHistory }: { orderHistory: Order[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {orderHistory?.map((order) => (
        <div
          key={order._id}
          className="p-3 border-2 border-gray-700 rounded-lg backdrop-blur-3xl shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>{order._id.substring(0, 6)}</div>
            <div className="flex space-x-1">
              {order.isPaid ? (
                <div className="text-xs p-2 bg-green-600 text-green-200 rounded-lg">
                  {order.paidAt.substring(0, 10)}
                </div>
              ) : (
                <div className="text-sm p-2 bg-rose-600 text-rose-200 rounded-lg">
                  Unpaid
                </div>
              )}

              {order.isDelivered ? (
                <div className="text-xs text-green-200 bg-green-800 rounded-lg p-2">
                  {order.deliveredAt.substring(0, 10)}
                </div>
              ) : order.isPaid ? (
                <div className="text-xs text-yellow-200 bg-yellow-800 rounded-lg p-2">
                  Under Delivery
                </div>
              ) : (
                <div className="text-xs text-rose-200 bg-rose-800 rounded-lg p-2">
                  Not Yet Shipped
                </div>
              )}
            </div>
          </div>
          <div className="my-5">
            <div><p>{order.createdAt.substring(0, 10)}</p></div>
            {order.orderItems.map((product) => (
              <span key={product._id}>
                <span>{product.name}, </span>
              </span>
            ))}
          </div>
          <div className="font-semibold flex justify-between items-center">
            <span>$ {order.totalPrice}</span>
            <Hanger link={`/order/id/${order._id}`}>Details</Hanger>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryCard;

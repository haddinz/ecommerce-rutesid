import { Order } from "../types/Order";
import Hanger from "./custom/hanger";

function HistoryTable({ orderHistory }: { orderHistory: Order[] }) {
  return (
    <table className="w-full text-black">
      <thead className="font-medium text-lg bg-sky-700 text-white">
        <tr>
          <th className="p-5 ">ID</th>
          <th className="p-5 text-left ">PRODUCT</th>
          <th className="p-5 text-left ">DATE</th>
          <th className="p-5 text-left w-28">TOTAL</th>
          <th className="p-5 text-left w-28">PAID</th>
          <th className="p-5 text-left w-28">DELIVERED</th>
          <th className="p-5 text-left w-28">ACTION</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orderHistory?.map((order, index) => (
          <tr
            key={order._id}
            className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}`}
          >
            <td className="p-5 whitespace-nowrap">
              {order._id.substring(0, 6)}
            </td>
            <td className="p-5 whitespace-nowrap">
              {order.orderItems.map((product) => (
                <div key={product._id}>
                  <span>{product.name}</span>
                </div>
              ))}
            </td>
            <td className="p-5 whitespace-nowrap">
              {order.createdAt.substring(0, 10)}
            </td>
            <td className="p-5 whitespace-nowrap">
              $ {order.totalPrice.toFixed(1)}
            </td>
            <td className="p-5 whitespace-nowrap">
              {order.isPaid ? (
                <div className="py-3 px-6 bg-green-600 font-semibold text-green-200 rounded-lg">
                  {order.paidAt.substring(0, 10)}
                </div>
              ) : (
                <div className="py-3 px-6 bg-rose-600 font-medium text-rose-200 rounded-lg text-center">
                  UNPAID
                </div>
              )}
            </td>
            <td className="p-5 whitespace-nowrap">
              {order.isDelivered ? (
                <div className="py-3 px-6 bg-green-600 font-semibold text-green-200 rounded-lg">
                  {order.deliveredAt.substring(0, 10)}
                </div>
              ) : order.isPaid ? (
                <div className="py-3 px-6 bg-amber-600 font-medium text-rose-200 rounded-lg">
                  UNDER DELIVERY
                </div>
              ) : (
                <div className="py-3 px-6 bg-rose-600 font-medium text-rose-200 rounded-lg">
                  NOT YET SHIPPED
                </div>
              )}
            </td>
            <td className="p-5 whitespace-nowrap ">
              <Hanger link={`/order/id/${order._id}`}>Details</Hanger>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default HistoryTable;

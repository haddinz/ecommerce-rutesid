function CheckOutStep(props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) {
  return (
    <div className="container">
      <div className="grid grid-cols-4 text-center">
        <div
          className={`py-3 ${
            props.step1 ? "border-b-2 border-yellow-500" : "border-gray-500"
          }`}
        >
          <span
            className={`py-1 px-2.5 rounded-full mr-3 ${
              props.step1 ? " bg-yellow-500" : "bg-gray-500"
            }`}
          >
            1
          </span>
          <p className="mt-2 hidden md:inline-block">Sign In</p>
        </div>
        <div
          className={`py-3 ${
            props.step2 ? "border-b-2 border-yellow-500" : "border-gray-500"
          }`}
        >
          <span
            className={`py-1 px-2.5 rounded-full mr-3 ${
              props.step2 ? " bg-yellow-500" : "bg-gray-500"
            }`}
          >
            2
          </span>
          <p className="mt-2 hidden md:inline-block">Shipping</p>
        </div>
        <div
          className={`py-3 border-b-2 ${
            props.step3 ? "border-yellow-500" : "border-gray-500"
          }`}
        >
          <span
            className={`py-1 px-2.5 rounded-full mr-3 ${
              props.step3 ? "bg-yellow-500" : "bg-gray-500"
            }`}
          >
            3
          </span>
          <p className="mt-2 hidden md:inline-block">Payment</p>
        </div>
        <div
          className={`py-3 border-b-2 ${
            props.step4 ? "border-yellow-500" : "border-gray-500"
          }`}
        >
          <span
            className={`py-1 px-2.5 rounded-full mr-3 ${
              props.step4 ? "bg-yellow-500" : "bg-gray-500"
            }`}
          >
            4
          </span>
          <p className="mt-2 hidden md:inline-block">Place Order</p>
        </div>
      </div>
    </div>
  );
}

export default CheckOutStep;

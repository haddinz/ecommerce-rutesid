const item = [1, 2, 3, 4, 5, 6];

const Product = () => {
  return (
    <div className="container">
      <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-6">
        {item.map((_item, index) => (
          <div
            key={index}
            className="flex justify-center flex-col items-center"
          >
            <div className="bg-gray-400 h-48 w-full md:w-64 rounded-lg"></div>
            <div className="h-4 bg-gray-400 rounded w-2/4 md:w-1/4 mt-2"></div>
            <div className="h-4 bg-gray-400 rounded w-2/4 md:w-1/4 mt-2"></div>
            <div className="h-8 bg-gray-400 rounded w-2/4 md:w-2/4 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <div className="container">
      <div className="animate-pulse grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-gray-400 rounded lg:col-span-2 max-w-[800px] h-[410px]"></div>
        <div className="lg:col-span-1">
          <div className="h-6 bg-gray-400 rounded mb-2 p-2" />
          <div className="h-6 bg-gray-400 rounded mb-2 p-2" />
          <div className="h-6 bg-gray-400 rounded mb-2 p-2" />
          <div className="h-6 bg-gray-400 rounded mb-2 p-2" />
        </div>
        <div className="lg:col-span-1">
          <div className="h-6 bg-gray-400 rounded mb-2 p-2" />
          <div className="h-6 bg-gray-400 rounded mb-6 p-2" />
          <div className="h-16 bg-gray-400 rounded p-2" />
        </div>
      </div>
    </div>
  );
};

const Spin = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-dashed border-4 border-gray-100 rounded-full animate-spin"></div>
      <div className="ml-3 text-gray-100">Loading...</div>
    </div>
  );
};

const Order = () => {
  return (
    <div className="container">
      <div className="animate-pulse grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="bg-gray-400 rounded mb-5 p-2 h-32" />
          <div className="bg-gray-400 rounded mb-5 p-2 h-32" />
          <div className="bg-gray-400 rounded mb-5 p-2 h-32" />
        </div>
        <div>
          <div className="bg-gray-400 rounded p-2 h-44" />
        </div>
      </div>
    </div>
  );
};

const History = () => {
  return (
    <div className="container">
      <div className="overflow-auto">
        <table className="animate-pulse w-full">
          <thead className="">
            <tr>
              <th className="p-5" />
            </tr>
          </thead>
          <tbody className="space-y-2">
            <div className="w-full py-8 bg-gray-400 text-center rounded-xl" />
            <div className="w-full py-8 bg-gray-400 text-center rounded-xl" />
            <div className="w-full py-8 bg-gray-400 text-center rounded-xl" />
            <div className="w-full py-8 bg-gray-400 text-center rounded-xl" />
            <div className="w-full py-8 bg-gray-400 text-center rounded-xl" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Loading = { Product, Details, Spin, Order, History };
export default Loading;

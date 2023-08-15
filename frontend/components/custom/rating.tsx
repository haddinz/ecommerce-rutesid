/* eslint-disable @typescript-eslint/no-non-null-assertion */

export default function Rating(props: {
  rating: number;
  numReviews?: number;
  caption?: string;
}) {
  const { rating, numReviews, caption } = props;
  
  return (
    <div>
      <div className="flex space-x-1">
        <span className={rating >= 1 ? "text-yellow-400" : rating >= 0.5 ? 'text-yellow-400' : "text-gray-500"}>★</span>
        <span className={rating >= 2 ? "text-yellow-400" : rating >= 1.5 ? 'text-yellow-400' : "text-gray-500"}>★</span>
        <span className={rating >= 3 ? "text-yellow-400" : rating >= 2.5 ? 'text-yellow-400' : "text-gray-500"}>★</span>
        <span className={rating >= 4 ? "text-yellow-400" : rating >= 3.5 ? 'text-yellow-400' : "text-gray-500"}>★</span>
        <span className={rating >= 5 ? "text-yellow-400" : rating >= 4.5 ? 'text-yellow-400' : "text-gray-500"}>★</span>
        { caption && <div>{caption}</div>}
      </div>
      {numReviews! >= 0 && <div className="text-yellow-500 font-semibold mb-3">{" " + numReviews + ' reviews'}</div>}
    </div>
  );
}

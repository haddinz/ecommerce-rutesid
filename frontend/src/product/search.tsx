import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import {
  GetSearchProduct,
  GetSearchProductCategory,
} from "../../components/hook/productHooks";
import Loading from "../../components/custom/loading";
import MessageBox from "../../components/custom/message";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import Icon from "../../components/custom/icon";
import ProductItems from "../../components/productItems";
import Dropdown from "../../components/custom/dropdown";
import Rating from "../../components/custom/rating";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [
  {
    name: "4stars & up",
    rating: "4",
  },

  {
    name: "3stars & up",
    rating: "3",
  },

  {
    name: "2stars & up",
    rating: "2",
  },

  {
    name: "1stars & up",
    rating: "1",
  },
];

const sortOrder = [
  {
    name: "Newest Arrival",
    value: "newest",
  },

  {
    name: "Lowest price",
    value: "lowest",
  },

  {
    name: "Highest Price",
    value: "highest",
  },

  {
    name: "Reviews",
    value: "toprated",
  },
];

export default function Search() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const category = params.get("category") || "all";
  const query = params.get("query") || "all";
  const rating = params.get("rating") || "all";
  const price = params.get("price") || "all";
  const order = params.get("order") || "newest";
  const page = Number(params.get("page") || 1);

  // ==========================================================================

  const { data, isLoading, error } = GetSearchProduct({
    category,
    price,
    query,
    rating,
    page,
    order,
  });

  // ==========================================================================

  const { data: categories } = GetSearchProductCategory();

  // ==========================================================================

  const getFilterUrl = (
    filter: {
      category?: string;
      price?: string;
      rating?: string;
      order?: string;
      page?: number;
      query?: string;
    },
    skipPathName = false
  ) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    const filterQuery = filter.query || query;
    const sortOrder = filter.order || order;
    return `${
      skipPathName ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <Layout title="Search Page" description="Search Page Product">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10">
        <div className="col-span-1">
          <h3 className="font-semibold mb-5">Filter</h3>

          <div>
            <Dropdown title={category !== "all" ? category : "Category"}>
              {categories?.map((categories, i) => (
                <Link
                  to={getFilterUrl({ category: categories, page: 1 })}
                  key={i}
                  className="mb-2 hover:bg-sky-500 p-2 rounded"
                >
                  {categories}
                </Link>
              ))}
            </Dropdown>

            <Dropdown title={price !== "all" ? price : "Price"}>
              {prices.map((p, i) => (
                <Link
                  key={i}
                  to={getFilterUrl({ price: p.value })}
                  className="mb-2 hover:bg-sky-500 p-2 rounded"
                >
                  {p.name}
                </Link>
              ))}
            </Dropdown>

            <Dropdown
              title={rating !== "all" ? rating + " & up starts" : "Rating"}
            >
              {ratings.map((r) => (
                <Link
                  key={r.name}
                  to={getFilterUrl({ rating: r.rating })}
                  className="mb-1 hover:bg-sky-500 p-1 rounded"
                >
                  <Rating
                    caption={r.rating + " & up starts"}
                    rating={Number(r.rating)}
                  />
                </Link>
              ))}
            </Dropdown>
          </div>
        </div>

        {isLoading ? (
          <Loading.Spin />
        ) : error ? (
          <MessageBox>{getError(error as ApiError)}</MessageBox>
        ) : (
          <div className="col-span-2">
            <div className="grid grid-cols-1 place-items-start md:place-items-stretch md:grid-cols-2 gap-3 mb-3">
              <div className="flex justify-center flex-col space-b-5">
                <h3 className="font-semibold mb-2">
                  {data?.countProduct === 0
                    ? "No Products Displaying"
                    : "Displaying " + data?.countProduct + " Products"}
                </h3>

                <div className="flex items-center space-x-2">
                  {query !== "all" && (
                    <div className="py-1 px-3 rounded bg-sky-300 dark:bg-sky-700 flex items-center justify-between">
                      {query}
                      <Link
                        to={getFilterUrl({ query: "all" })}
                        className="ml-2"
                      >
                        <Icon.Times />
                      </Link>
                    </div>
                  )}
                  {category !== "all" && (
                    <div className="py-1 px-3 rounded bg-sky-300 dark:bg-sky-700 flex items-center justify-between">
                      {category}
                      <Link
                        to={getFilterUrl({ category: "all" })}
                        className="ml-2"
                      >
                        <Icon.Times />
                      </Link>
                    </div>
                  )}
                  {price !== "all" && (
                    <div className="py-1 px-3 rounded bg-sky-300 dark:bg-sky-700 flex items-center justify-between">
                      {price}
                      <Link
                        to={getFilterUrl({ price: "all" })}
                        className="ml-2"
                      >
                        <Icon.Times />
                      </Link>
                    </div>
                  )}
                  {rating !== "all" && (
                    <div className="py-1 px-3 rounded bg-sky-300 dark:bg-sky-700 flex items-center justify-between">
                      {rating + " & up"}
                      <Link
                        to={getFilterUrl({ rating: "all" })}
                        className="ml-2"
                      >
                        <Icon.Times />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-start md:justify-end items-center">
                  <p className="mr-1">Sort By: </p>
                  <select
                    className="py-1 px-5 rounded-lg border-2 border-sky-700 text-black"
                    value={order}
                    id={order}
                    onChange={(e) =>
                      navigate(getFilterUrl({ order: e.target.value }))
                    }
                  >
                    {sortOrder.map((sortOrder, index) => (
                      <option key={index} value={sortOrder.value}>
                        {sortOrder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {data?.products.length === 0 && (
              <MessageBox>Product Not Found</MessageBox>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              {data?.products.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded shadow-md"
                >
                  <ProductItems product={product} />
                </div>
              ))}
            </div>

            <div>
              {[...Array(data?.pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  className="mx-1"
                  to={{
                    pathname: "/search",
                    search: getFilterUrl({ page: x + 1 }, true),
                  }}
                >
                  <button
                    className={`py-1 px-3 rounded-full text-white ${
                      Number(page) === x + 1 ? "bg-sky-700" : "bg-gray-700"
                    }`}
                  >
                    {x + 1}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

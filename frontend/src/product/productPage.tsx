import ProductItems from "../../components/productItems";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils/getError";
import MessageBox from "../../components/custom/message";
import Loading from "../../components/custom/loading";
import { GetQueryProduct } from "../../components/hook/productHooks";
import Layout from "../../components/layout"

function ProductPage() {
  const { data: products, isLoading, error } = GetQueryProduct();

  return (
    <Layout title="Homepage">
      <div className="w-full">
        {isLoading ? (
          <Loading.Product />
        ) : error ? (
          <MessageBox>{getError(error as ApiError)}</MessageBox>
        ) : (
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <div key={product.slug}>
                <ProductItems product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ProductPage;

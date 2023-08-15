/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Loading from "../../../components/custom/loading";
import MessageBox from "../../../components/custom/message";
import { GetQuerySlug } from "../../../components/hook/productHooks";
import Layout from "../../../components/layout";
import ProductSlug from "../../../components/productSlug";
import { ApiError } from "../../../types/ApiError";
import { Product } from "../../../types/Product";
import { getError } from "../../../utils/getError";
import { useParams } from "react-router-dom";

function GetProductDetailsSlug() {
  const params = useParams();
  const { slug } = params;
  const { data: product, isLoading, error } = GetQuerySlug(slug!);
  const productSlug: Product = product!;
  return (
    <>
      <Layout title={slug} description={product?.description}>
        {isLoading ? (
          <Loading.Details />
        ) : error ? (
          <MessageBox>{getError(error as ApiError)}</MessageBox>
        ) : (
          <div className="container">
            <ProductSlug product={productSlug} />
          </div>
        )}
      </Layout>
    </>
  );
}

export default GetProductDetailsSlug;

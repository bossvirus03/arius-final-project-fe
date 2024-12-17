import { ApiUrls } from "../../../../../configs/url";
import api from "../../../../../services/axios";

export const onAddProductToCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const url = ApiUrls.user.addProductToCart.replace("{productId}", productId);

  const data = await api.post(url, {}, { params: { quantity: quantity } });
  return data?.data.data;
};

export const onRemoveProductFromCart = async ({
  productId,
}: {
  productId: string;
}) => {
  const url = ApiUrls.user.removeProductFromCart.replace(
    "{productId}",
    productId
  );
  const data = await api.delete(url);

  return data?.data.data;
};

export const onUpdateProductQuantityInCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const url = ApiUrls.user.updateProductQuantityInCart.replace(
    "{productId}",
    productId
  );

  const data = await api.patch(url, {},{ params: { quantity } });

  return data?.data.data;
};

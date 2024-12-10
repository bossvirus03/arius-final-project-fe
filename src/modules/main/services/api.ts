import { ApiUrls } from "../../../configs/url";
import api from "../../../services/axios";

export const onAddProductToCart = ({ productId }: { productId: string }) => {
  const url = ApiUrls.user.addProductToCart.replace("{productId}", productId);

  return api.post(url);
};

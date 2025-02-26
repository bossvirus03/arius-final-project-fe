export const ApiUrls = {
  apiBaseUrl: "http://localhost:3050/api",
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    refreshToken: "/auth/refresh",
  },
  admin: {
    order: {
      getAll: "/order/admin-get-all",
      updateOrderStatus: "/order",
      updateShippingStatus: "/order",
    },
    user: {
      getAll: "/user",
      update: "/user",
      delete: "/user",
      create: "/user",
      import: "/user/import",
      export: "/user/export",
    },
    role: {
      getAll: "/role",
      update: "/role",
      delete: "/role",
      create: "/role",
    },
    product: {
      getAll: "/product",
      update: "/product",
      delete: "/product",
      create: "/product",
      import: "/product/import",
      export: "/product/export",
    },
    category: {
      getAll: "/category",
      update: "/category",
      delete: "/category",
      create: "/category",
    },
    tag: {
      getAll: "/tag",
      update: "/tag",
      delete: "/tag",
      create: "/tag",
    },
  },
  user: {
    getMe: "/user/me",
    cartInfo: "/cart/mine/info",
    getProductDetail: "/product",
    addProductToCart: "/cart/add-product/{productId}",
    removeProductFromCart: "/cart/remove-product/{productId}",
    searchProduct: "/product/search",
    createOrderFromCart: "/order/create-from-cart",
    getOrders: "/order",
    getOrderDetail: "/order",
    uploadMultiFile: "/file/uploads",
    uploadFile: "/file/upload",
    getRandomTagWithProducts: "/product/home/tags",
    updateProductQuantityInCart: "/cart/product/{productId}/quantity",
  },
};

export const ApiUrls = {
  apiBaseUrl: "http://localhost:3050/api",
  auth: {
    login: "http://localhost:3050/api/auth/login",
    register: " http://locahost:3050/api/register",
    refreshToken: "http://localhost:3050/api/auth/refresh",
  },
  admin: {
    user: {
      getAll: "http://localhost:3050/api/user",
      update: "http://localhost:3050/api/user",
      delete: "http://localhost:3050/api/user",
      create: "http://localhost:3050/api/user",
      import: "http://localhost:3050/api/user/import",
      export: "http://localhost:3050/api/user/export",
    },
    role: {
      getAll: "http://localhost:3050/api/role",
      update: "http://localhost:3050/api/role",
      delete: "http://localhost:3050/api/role",
      create: "http://localhost:3050/api/role",
    },
    product: {
      getAll: "http://localhost:3050/api/product",
      update: "http://localhost:3050/api/product",
      delete: "http://localhost:3050/api/product",
      create: "http://localhost:3050/api/product",
      import: "http://localhost:3050/api/product/import",
      export: "http://localhost:3050/api/product/export",
    },
    category: {
      getAll: "http://localhost:3050/api/category",
      update: "http://localhost:3050/api/category",
      delete: "http://localhost:3050/api/category",
      create: "http://localhost:3050/api/category",
    },
    tag: {
      getAll: "http://localhost:3050/api/tag",
      update: "http://localhost:3050/api/tag",
      delete: "http://localhost:3050/api/tag",
      create: "http://localhost:3050/api/tag",
    },
  },
};

import { ApiUrls } from "../../../configs/url";
import api from "../../../services/axios";
import {
  CategoryRecord,
  CreateProductRequest,
  CreateRoleRequest,
  CreateUserRequest,
  GetOrderDetailResponse,
  IBackendEntity,
  OrderRecord,
  ProductsResponse,
  RoleRecord,
  TagRecord,
  UpdateCategoryRequest,
  UpdateProductRequest,
  UpdateRoleRequest,
  UpdateTagRequest,
  UpdateUserRequest,
  UserRecord,
  UsersResponse,
} from "../../../types/backend";

// USER
export const onUpdateUser = ({
  userId,
  updates,
}: {
  userId: string;
  updates: UpdateUserRequest;
}) => {
  return api.put<UserRecord>(`${ApiUrls.admin.user.update}/${userId}`, updates);
};
export const onCreateUser = ({ body }: { body: CreateUserRequest }) => {
  return api.post<UserRecord>(`${ApiUrls.admin.user.update}`, body);
};

export const onDeleteUser = (userId: string) => {
  return api.delete<UserRecord>(`${ApiUrls.admin.user.delete}/${userId}`);
};

export const onImportUsers = ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file);

  console.log("Gửi yêu cầu API import với file:", file); // Debug: Kiểm tra file

  return api.post(
    `${ApiUrls.admin.user.import}`, // Kiểm tra URL
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo đúng Content-Type
      },
    }
  );
};

export const onExportUsers = () => {
  return api.get(`${ApiUrls.admin.user.export}`, { responseType: "blob" });
};

export const onGetUsers = async ({
  sortField,
  sortOrder,
  page,
  size,
}: {
  sortField: string;
  sortOrder: string;
  page: number;
  size: number;
}): Promise<UsersResponse> => {
  const response = await api.get(
    ApiUrls.admin.user.getAll +
      `?sort=${sortField},${sortOrder}&size=${size}&page=${page}`
  );
  return response?.data?.data;
};

// PRODUCT
export const onAdminGetProducts = async ({
  sortField,
  sortOrder,
  page,
  size,
}: {
  sortField: string;
  sortOrder: string;
  page: number;
  size: number;
}): Promise<ProductsResponse> => {
  const data = await api.get(
    ApiUrls.admin.product.getAll +
      `?sort=${sortField},${sortOrder}&size=${size}&page=${page}`
  );
  return data?.data.data;
};

export const onUpdateProduct = ({
  productId,
  updates,
}: {
  productId: string;
  updates: UpdateProductRequest;
}) => {
  return api.put<ProductsResponse>(
    `${ApiUrls.admin.product.update}/${productId}`,
    updates
  );
};

export const onCreateProduct = ({ body }: { body: CreateProductRequest }) => {
  return api.post<ProductsResponse>(`${ApiUrls.admin.product.create}`, body);
};

export const onDeleteProduct = (productId: string) => {
  return api.delete<ProductsResponse>(
    `${ApiUrls.admin.product.delete}/${productId}`
  );
};

export const onImportProducts = ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file);

  console.log("Gửi yêu cầu API import với file:", file); // Debug: Kiểm tra file

  return api.post(
    `${ApiUrls.admin.product.import}`, // Kiểm tra URL
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo đúng Content-Type
      },
    }
  );
};

export const onExportProducts = () => {
  return api.get(`${ApiUrls.admin.product.export}`, { responseType: "blob" });
};

// CATEGORY
export const onGetCategories = async (): Promise<CategoryRecord[]> => {
  const data = await api.get(ApiUrls.admin.category.getAll);
  return data?.data.data;
};

export const onCreateCategory = ({ body }: { body: CreateRoleRequest }) => {
  return api.post<CategoryRecord>(`${ApiUrls.admin.category.create}`, body);
};

export const onUpdateCategory = ({
  category,
  updates,
}: {
  category: string;
  updates: UpdateCategoryRequest;
}) => {
  return api.put<UserRecord>(
    `${ApiUrls.admin.category.update}/${category}`,
    updates
  );
};

export const onDeleteCategory = (categoy: string) => {
  return api.delete<String>(`${ApiUrls.admin.category.delete}/${categoy}`);
};

// TAGS
export const onGetTags = async (): Promise<TagRecord[]> => {
  const data = await api.get(ApiUrls.admin.tag.getAll);
  return data?.data.data;
};
export const onCreateTag = ({ body }: { body: CreateRoleRequest }) => {
  return api.post<TagRecord>(`${ApiUrls.admin.tag.create}`, body);
};

export const onUpdateTag = ({
  tag,
  updates,
}: {
  tag: string;
  updates: UpdateTagRequest;
}) => {
  return api.put<UserRecord>(`${ApiUrls.admin.tag.update}/${tag}`, updates);
};

export const onDeleteTag = (categoy: string) => {
  return api.delete<String>(`${ApiUrls.admin.category.delete}/${categoy}`);
};
// ROLES
export const onGetRoles = async (): Promise<RoleRecord[]> => {
  const data = await api.get(ApiUrls.admin.role.getAll);
  return data?.data.data;
};

export const onCreateRole = ({ body }: { body: CreateRoleRequest }) => {
  return api.post<RoleRecord>(`${ApiUrls.admin.role.update}`, body);
};

export const onDeleteRole = (role: string) => {
  return api.delete<String>(`${ApiUrls.admin.role.delete}/${role}`);
};

export const onUpdateRole = ({
  role,
  updates,
}: {
  role: string;
  updates: UpdateRoleRequest;
}) => {
  return api.put<UserRecord>(`${ApiUrls.admin.role.update}/${role}`, updates);
};

// ORDER
export const onGetOrders = async (): Promise<OrderRecord[]> => {
  const data = await api.get(ApiUrls.admin.order.getAll);
  return data?.data.data;
};

export const onUpdateShippingStatus = async ({
  orderId,
  newShippingStatus,
}: {
  orderId: string;
  newShippingStatus: string;
}): Promise<OrderRecord> => {
  const response = await api.put(
    `${ApiUrls.admin.order.updateOrderStatus}/${orderId}/shipping-status`,
    null,
    {
      params: { newShippingStatus },
    }
  );
  return response.data.data;
};

export const onUpdateOrderStatus = async ({
  orderId,
  newStatus,
}: {
  orderId: string;
  newStatus: string;
}): Promise<OrderRecord> => {
  const response = await api.put(
    `${ApiUrls.admin.order.updateShippingStatus}/${orderId}/status`,
    null,
    {
      params: { newStatus },
    }
  );
  return response.data.data;
};

// UPLOAD FILE
export const onUploadFiles = async (files: File[], folder: string) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post<{ data: string[] }>(
    ApiUrls.user.uploadMultiFile + `?folder=${folder}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const onUploadFile = async (file: File, folder: string) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<any>(
    ApiUrls.user.uploadFile + `?folder=${folder}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response?.data?.data;
};

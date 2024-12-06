import { ApiUrls } from "../../../configs/url";
import api from "../../../services/axios";
import {
  CategoryResponse,
  CreateRoleRequest,
  CreateUserRequest,
  ProductResponse,
  RoleResponse,
  TagResponse,
  UpdateCategoryRequest,
  UpdateProductRequest,
  UpdateRoleRequest,
  UpdateTagRequest,
  UpdateUserRequest,
  UserResponse,
} from "../../../types/backend";

// USER
export const onUpdateUser = ({
  userId,
  updates,
}: {
  userId: string;
  updates: UpdateUserRequest;
}) => {
  return api.put<UserResponse>(
    `${ApiUrls.admin.user.update}/${userId}`,
    updates
  );
};
export const onCreateUser = ({ body }: { body: CreateUserRequest }) => {
  return api.post<UserResponse>(`${ApiUrls.admin.user.update}`, body);
};

export const onDeleteUser = (userId: string) => {
  return api.delete<UserResponse>(`${ApiUrls.admin.user.delete}/${userId}`);
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

export const onGetUsers = async (sortField: string, sortOrder: string) => {
  const response = await api.get(
    ApiUrls.admin.user.getAll + `?sort=${sortField},${sortOrder}`
  );
  return response?.data?.data;
};

// PRODUCT
export const onGetProducts = async (
  sortField: string,
  sortOrder: string
): Promise<ProductResponse[]> => {
  const data = await api.get(
    ApiUrls.admin.product.getAll + `?sort=${sortField},${sortOrder}`
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
  return api.put<ProductResponse>(
    `${ApiUrls.admin.user.update}/${productId}`,
    updates
  );
};

export const onCreateProduct = ({ body }: { body: ProductResponse }) => {
  return api.post<ProductResponse>(`${ApiUrls.admin.product.create}`, body);
};

export const onDeleteProduct = (productId: string) => {
  return api.delete<ProductResponse>(
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
export const onGetCategories = async (): Promise<CategoryResponse[]> => {
  const data = await api.get(ApiUrls.admin.category.getAll);
  return data?.data.data;
};

export const onCreateCategory = ({ body }: { body: CreateRoleRequest }) => {
  return api.post<CategoryResponse>(`${ApiUrls.admin.category.create}`, body);
};

export const onUpdateCategory = ({
  category,
  updates,
}: {
  category: string;
  updates: UpdateCategoryRequest;
}) => {
  return api.put<UserResponse>(
    `${ApiUrls.admin.category.update}/${category}`,
    updates
  );
};

export const onDeleteCategory = (categoy: string) => {
  return api.delete<String>(`${ApiUrls.admin.category.delete}/${categoy}`);
};

// TAGS
export const onGetTags = async (): Promise<TagResponse[]> => {
  const data = await api.get(ApiUrls.admin.tag.getAll);
  return data?.data.data;
};
export const onCreateTag = ({ body }: { body: CreateRoleRequest }) => {
  return api.post<TagResponse>(`${ApiUrls.admin.tag.create}`, body);
};

export const onUpdateTag = ({
  tag,
  updates,
}: {
  tag: string;
  updates: UpdateTagRequest;
}) => {
  return api.put<UserResponse>(`${ApiUrls.admin.tag.update}/${tag}`, updates);
};

export const onDeleteTag = (categoy: string) => {
  return api.delete<String>(`${ApiUrls.admin.category.delete}/${categoy}`);
};
// ROLES
export const onGetRoles = async (): Promise<RoleResponse[]> => {
  const data = await api.get(ApiUrls.admin.role.getAll);
  return data?.data.data;
};

export const onCreateRole = ({ body }: { body: CreateRoleRequest }) => {
  return api.post<RoleResponse>(`${ApiUrls.admin.role.update}`, body);
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
  return api.put<UserResponse>(`${ApiUrls.admin.role.update}/${role}`, updates);
};

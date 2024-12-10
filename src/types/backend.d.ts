export interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  dob: Date;
  roles: string[];
}

export interface UpdateUserRequest {
  password: string;
  address: string;
  phone: string;
  dob: Date;
  roles: string[];
}

export interface UpdateProductRequest {}

export interface CreateProductRequest {}

export interface CreateRoleRequest {
  name: string;
  description: string;
}
export interface UpdateRoleRequest {
  name: string;
  description: string;
}
export interface UpdateCategoryRequest {
  name: string;
  description: string;
}

export interface RoleResponse {
  name: string;
  description?: string;
}

export interface CategoryResponse {
  name: string;
  description?: string;
}

export interface TagResponse {
  name: string;
  description?: string;
}

export interface UpdateTagRequest {
  name: string;
  description?: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  thumbnail: string;
  quantity: number;
  discount: number;
  tags: string[];
}

export interface MetaPagination {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface ProductResponse {
  meta: MetaPagination;
  result: ProductRecord[];
}

export interface UserResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  address: string;
  username: string;
  dob: Date;
  phone: string;
  active: boolean;
  avatar: String;
  roles: RoleResponse[];
}

export interface IBackendResponse<T> {
  error?: string | string[];
  message: string;
  code: number | string;
  data?: T;
}

export interface ILoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface CartInfoResponse {
  itemCount: number;
  totalPrice: number;
  items: ProductRecord[];
}

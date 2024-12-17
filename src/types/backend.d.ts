import { ProductStatus } from "./backend.enum";

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

export interface UpdateProductRequest {
  name: string;
  images: string[];
  status: ProductStatus;
  price: number;
  category: string;
  tags: string[];
  quantity: number;
  discount: number;
  description: string;
  thumbnail: string;
  deletedImages: string[];
}

export interface CreateProductRequest {
  name: string;
  images: string[];
  price: number;
  category: string;
  tags: string[];
  quantity: number;
  discount: number;
  description: string;
  thumbnail: string;
}

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

export interface RoleRecord {
  name: string;
  description?: string;
}

export interface CategoryRecord {
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

export interface ProductsResponse {
  meta: MetaPagination;
  result: ProductRecord[];
}

export interface UsersResponse {
  meta: MetaPagination;
  result: UserRecord[];
}

export interface UserRecord {
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
  roles: RoleRecord[];
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
  items: CartInfoProductResponse[];
}

export interface CartInfoProductResponse {
  quantity: number;
  itemDetail: ProductRecord;
}

export interface CheckoutItemProductResponse {
  quantity: number;
  itemDetail: ProductRecord;
}

export interface SearchProductResponse {
  data: ProductRecord[];
  totalPages: number;
  totalElements: number;
}

export interface GetOrdersResponse {
  data: OrderRecord[];
}

export interface OrderRecord {
  orderId: string;
  orderDate: string;
  totalMoney: number;
  status: string;
  paymentMethod: string;
  shippingAddress: string;
  shippingFee: number;
  shippingMethod: string;
  shippingStatus: string;
  estimatedDeliveryDate: string;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  product: ProductRecord[];
  quantity: number;
  price: number;
}

export interface GetOrderDetailResponse {
  data: OrderDetail;
}

export interface IBackendEntity<T> {
  code: number;
  data: T;
}

export interface GetRandomTagWithProductsResponse {
  [key: string]: ProductRecord[];
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  category: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  categoryId: string;
  createdBy: string;
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  price: IProductPrice;
  stock: IProductStock;
}

export interface IProductPrice {
  id: number;
  productId: string;
  updatedBy: string;
  price: number;
  createdAt: Date;
}

export interface IProductStock {
  id: number;
  productId: string;
  updatedBy: string;
  quantity: number;
  createdAt: Date;
}

export interface IPaymentMethod {
  id: string;
  method: string;
  createdAt: Date;
}

export interface IOrder {
  id: string;
  methodId: string;
  createBy: string;
  subTotal: number;
  status: "paid" | "not_paid";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  method: IPaymentMethod;
  products: IProduct[];
}

export interface IPaginate<Model> {
  data: Model[];
  meta: IMeta;
}

export interface IMeta {
  current_page: number;
  first_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  previous_page_url: null;
  total: number;
}

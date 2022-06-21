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
  createdById: string;
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  prices: IProductPrice;
  stocks: IProductStock;
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
  products: IProduct[];
}

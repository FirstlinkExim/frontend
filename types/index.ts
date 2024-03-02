import { ICartItem } from "@/redux/slices/productSlice";

export interface IImage {
  id?: string;
  url: string;
}

export type Location = {
  lat: number;
  lng: number;
};
export type Address = {
  _id: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  ip?: string;
  isActive?: boolean;
};

export interface RegisterCustomer {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  device: string;
  acceptTerms: boolean;
}

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  sku: string;
  barcode: string;
  images: {
    url: string;
    _id: string;
  }[];
  discountType: string;
  discountPrice: number;
  shippingPrice: number;
  createdAt: string;
  updatedAt: string;
  like: boolean;
  currency: string;
  sizes: string[];
  condition: string;
  type: string;
  purchased: number;
  colors: string[];
  quality: string;
}

export interface ICart {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  sku: string;
  barcode: string;
  discountType: string;
  discountPrice: number;
  shippingPrice: number;
  createdAt: string;
  updatedAt: string;
  like: boolean;
  currency: string;
  condition: string;
  type: string;
  purchased: number;
  quality: string;
  image: IImage;
  size: string;
  color: string;
}

export interface IReview {
  _id: string;
  message: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  customer: {
    _id: string;
    name: string;
    email: string;
    profileImg?: IImage;
  };
}

export interface IOrder {
  cart: ICartItem[];
  customer: {
    name: string;
    email: string;
    profileImg?: IImage;
    id: string;
  };
  createdAt: Date;
  status: string;
  totalPrice: number;
  shippingAddress: {
    city: string;
    state: string;
    zipcode: string;
    country: string;
    address: string;
  };
  paymentInfo: {
    id: string;
    status: string;
    type: string;
  };
  paidAt: Date;
  orderId: string;
  _id: string;
}

export interface IImage {
  id?: string;
  url: string;
}

export type Address = {
  city: string;
  state: string;
  zipCode: string;
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
    color: string;
    _id: string;
  }[];
  discountType: string;
  discountPrice: number;
  shippingPrice: number;
  createdAt: string;
  updatedAt: string;
  like: boolean;
  carts: any[];
  currency: string;
  size: string
}

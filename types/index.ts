export interface IImage {
  id: string;
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
  ip: string;
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
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

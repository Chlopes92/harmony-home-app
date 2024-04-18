export interface ApiResponse {
  success: boolean;
  data: Product[];
}

export interface OtherResponse{
  success: boolean;
  data: Product;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  dimension: string;
  features: string[];
  price: number;
  img_url: string ;
}
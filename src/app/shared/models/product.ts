import { SubCategory } from "./SubCategory";

export class Product {
  id!: string;
  title!: string;
  description!: string;
  dimension!: string;
  features!: string[];
  price!: number;
  img_url!: string ;
  subCategory_id!: SubCategory[];
  // isAddToCart: boolean;
  // isAddToWishlist: boolean;
}
import { Category } from "./Category";

export class SubCategory {
    id!: string;
    name?: string;
    img_url?: string;
    categories_id!: Category[]; 
}


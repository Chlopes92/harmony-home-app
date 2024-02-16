export interface ICategoryImg {
    src: string;
}

export interface IProductImg {
    src: string;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    dimension: string;
    features: string[];
    price: number;
    img: IProductImg;
    isAddToCart: boolean;
}

export type CategoryType = "Tous les produits" | "Salon" | "Cuisine" | "Salle à manger" | "Chambre" | "Bureau" | "Salle de bain" | "Textiles" | "Déco Murale" | "Luminaires" | "Accessoires";

export interface ICategory {
    id: number;
    name: string;
    subcategories: CategoryType[];
    img: ICategoryImg;
    products?: IProduct[];
}

export interface ApiResponse{
    success: boolean;
    data: Category[];
}

export interface Category {
    id: string;
    name: string;
    icon_url: string;
}

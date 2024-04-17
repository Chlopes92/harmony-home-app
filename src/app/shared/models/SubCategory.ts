export interface ApiResponse {
    success: boolean;
    data: SubCategory[];
}

export interface SubCategory {
    id: string;
    name: string;
    img_url: string; 
}


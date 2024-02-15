import { ICategory } from "./shared/models/product";

export const CATEGORY: ICategory[] = [
    {
        id: 1,
        name: "Canapés & Fauteuils",
        subcategories: ["Tous les produits", "Salon"],
        img: {
            src: "/img-category/canapes-fauteuils.png",
            alt: "Catégorie Canapés et fauteuils"
        },
        products: [
            {
                id: 1,
                title: "Canapé moderne en tissu",
                description: "Ce canapé moderne offre un design confortable. Parfait pour votre salon, il apportera une touche de sophistication à votre espace de vie.",
                dimension: "Longueur: 150 cm, Profondeur: 92 cm, Hauteur: 90 cm",
                features: ["Revêtement en tissu résistant", "Assise rembourrée pour un confort optimal", "Structure solide en bois"],
                price: 399,
                quantity: 1,
                img: {
                    src: "/img-category/canapes-fauteuils.png",
                    alt: "Catégorie Canapés et fauteuils"
                },
                isAddToCart: false,
            }
        ]
    },
    {
        id: 2,
        name: "Tables basses",
        subcategories: ["Tous les produits", "Salon"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 3,
        name: "Meubles TV",
        subcategories: ["Tous les produits", "Salon"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 4,
        name: "Etagères de salon",
        subcategories: ["Tous les produits", "Salon"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 5,
        name: "Vaisselle de cuisine",
        subcategories: ["Tous les produits", "Cuisine"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 6,
        name: "Mobilier de cuisine",
        subcategories: ["Tous les produits", "Cuisine"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 7,
        name: "Rangement de cuisine",
        subcategories: ["Tous les produits", "Cuisine"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 8,
        name: "Tables à manger",
        subcategories: ["Tous les produits", "Salle à manger"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 9,
        name: "Chaises & Bancs",
        subcategories: ["Tous les produits", "Salle à manger"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 10,
        name: "Vaisseliers & Buffets",
        subcategories: ["Tous les produits", "Salle à manger"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 11,
        name: "Nappes & Sets de tables",
        subcategories: ["Tous les produits", "Salle à manger"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 12,
        name: "Lits & Têtes de lit",
        subcategories: ["Tous les produits", "Chambre"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 13,
        name: "Mobilier de chambre",
        subcategories: ["Tous les produits", "Chambre"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 14,
        name: "Lampe de chevet",
        subcategories: ["Tous les produits", "Chambre"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 15,
        name: "Dressing",
        subcategories: ["Tous les produits", "Chambre"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 16,
        name: "Bureaux design",
        subcategories: ["Tous les produits", "Bureau"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 17,
        name: "Rangements de bureau",
        subcategories: ["Tous les produits", "Bureau"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 18,
        name: "Baignoire & Douche",
        subcategories: ["Tous les produits", "Salle de bain"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 19,
        name: "Meubles de salle de bain",
        subcategories: ["Tous les produits", "Salle de bain"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 20,
        name: "Miroirs de salle de bain",
        subcategories: ["Tous les produits", "Salle de bain"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 21,
        name: "Lavabo",
        subcategories: ["Tous les produits", "Salle de bain"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 22,
        name: "Coussins décoratifs & Housse",
        subcategories: ["Tous les produits", "Textiles"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 23,
        name: "Plaids & Couvertures",
        subcategories: ["Tous les produits", "Textiles"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 24,
        name: "Tapis",
        subcategories: ["Tous les produits", "Textiles"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 25,
        name: "Rideaux & Stores",
        subcategories: ["Tous les produits", "Textiles"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 26,
        name: "Tableaux artistiques",
        subcategories: ["Tous les produits", "Déco Murale"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 27,
        name: "Miroirs décoratifs",
        subcategories: ["Tous les produits", "Déco Murale"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 28,
        name: "Horloges design",
        subcategories: ["Tous les produits", "Déco Murale"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 29,
        name: "Lampes de table",
        subcategories: ["Tous les produits", "Luminaires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 30,
        name: "Suspensions",
        subcategories: ["Tous les produits", "Luminaires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 31,
        name: "Lampadaires",
        subcategories: ["Tous les produits", "Luminaires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 32,
        name: "Appliques murales",
        subcategories: ["Tous les produits", "Luminaires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 33,
        name: "Guirlandes lumineuses",
        subcategories: ["Tous les produits", "Luminaires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 34,
        name: "Vases & Objets en céramiques",
        subcategories: ["Tous les produits", "Accessoires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 35,
        name: "Bougies et photophores",
        subcategories: ["Tous les produits", "Accessoires"],
        img: {
            src: "",
            alt: ""
        },
    },
    {
        id: 36,
        name: "Paniers de rangement",
        subcategories: ["Tous les produits", "Accessoires"],
        img: {
            src: "",
            alt: ""
        },
    },
]
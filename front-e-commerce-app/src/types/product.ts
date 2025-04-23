interface Brand {
    id: string,
    name: string,
    status: boolean
}

interface Category {
    id: string,
    name: string
}

export interface Product {
    id: string,
    name: string,
    description: string,
    countryOrigin: string,
    unitPrice: number,
    quantity: number,
    uom: string,
    stock: number,
    urlImage: string,
    brand: Brand,
    category: Category
}
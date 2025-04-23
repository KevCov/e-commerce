export enum PaymentMethod {
    YAPE = 'YAPE',
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
}

export interface PurchaseProducts {
    id: string,
    name: string,
    description: string,
    urlImage: string,
    quantity: number,
    unitPrice: number,
}

export interface Shipping {
    id?: string,
    province: string,
    district: string,
    department: string,
    street: string,
    zipCode: string,
    houseNumber: string,
    customerId?: string
}

export interface Order {
    id?: string,
    totalAmount: number,
    orderDate?: string
    paymentMethod: PaymentMethod,
    customerId?: string,
    shipping: Shipping,
    cardLast4: string,
    products: PurchaseProducts[]
}
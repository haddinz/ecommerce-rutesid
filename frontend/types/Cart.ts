export type CartItems = {
    _id: string
    name: string
    image: string | undefined
    slug: string
    countInStock: number
    price: number
    quantity: number
}

export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    country: string
    postalCode: string
}

export type Cart = {
    cartItems: CartItems[]
    shippingAddress: ShippingAddress
    paymentMethod: string
    itemPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
}
export type RestaurantsType = {
    alias: string
    categories: Array<CategoryType>
    coordinates: CoordinateType
    display_phone: string
    distance: string
    id: string
    image_url: string
    is_closed: boolean
    location: LocationType
    name: string
    phone: string
    price: string
    rating: number
    review_count: number
    transactions: Array<string>
    url: string
}
export type CategoryType = {
    alias: string
    title: string
}
export type CoordinateType = {
    latitude: number
    longitude: number
}
export type LocationType = {
    address1: string
    address2: string
    address3: string
    city: string
    country: string
    display_address: Array<string>
    state: string
    zip_code: string
}
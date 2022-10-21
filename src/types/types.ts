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
export type RestaurantType = {
    alias: string
    categories: Array<CategoryType>
    coordinates: CoordinateType
    display_phone: string
    distance: string
    id: string
    image_url: string
    is_closed: boolean
    is_claimed: boolean
    location: RestaurantLocationType
    name: string
    phone: string
    price: string
    rating: number
    review_count: number
    transactions: Array<string>
    url: string
    photos: Array<string>
    special_hours: Array<SpecialHoursType>
    hours: Array<HourType>

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
    cross_streets?: string
}
export type HourType = {
    open: Array<OpenType>
    hours_type: string,
    is_open_now: boolean
}
export type OpenType = {
    day: number
    start: string
    end: string
    is_overNight: boolean
}
export type RestaurantLocationType = {
    address1: string
    address2: string
    address3: string
    city: string
    country: string
    display_address: Array<string>
    state: string
    zip_code: string
    cross_streets: string
}
export type SpecialHoursType = {
    date: string
    isClosed: boolean | null
    start: string
    end: string
    is_overNight: boolean
}
export type PriceLevelType = '1' | '2' | '3' | '4' | '1,2,3,4'
export type SortType = 'best_match' | 'rating' | 'review_count'
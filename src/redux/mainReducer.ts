import { Dispatch } from "redux"
import { resturantsAPI } from "../api/api"
import { RestaurantsType, PriceLevelType } from "../types/types"
import { BaseThunkType, InferActionsType } from "./store"

export type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setRestaurantsAC: (restaurants: Array<RestaurantsType>) => {
        return {
            type: "MAIN/SET_RESTAURANTS",
            restaurants: restaurants
        } as const
    },
    setFilteredRestaurantsAC: (filteredRestaurants: Array<RestaurantsType>) => {
        return {
            type: "MAIN/SET_FILTERED_RESTAURANTS",
            filteredRestaurants: filteredRestaurants
        } as const
    },
    setPriceLevelAC: (priceLevel: PriceLevelType) => {
        return {
            type: "MAIN/SET_PRICE_LEVEL",
            priceLevel: priceLevel
        } as const
    },
    isClosedAC: (isClosed: boolean) => {
        return {
            type: "MAIN/IS_CLOSED",
            isClosed: isClosed
        } as const
    },
    setMapCenter: (mapCenter: { lat: number, lng: number }) => {
        return {
            type: "MAIN/MAP_CENTER",
            mapCenter: mapCenter
        } as const
    },
}

type ThunkType = BaseThunkType<ActionsTypes>


let initialState = {
    restaurants: [
        /* {
            rating: 4,
            price: "$",
            phone: "+14152520800",
            id: "E8RJkjfdcwgtyoPMjQ_Olg",
            alias: "four-barrel-coffee-san-francisco",
            is_closed: true,
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            display_phone: '2',
            review_count: 1738,
            name: "Four Barrel Coffee",
            url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
            coordinates: {
                latitude: 37.7670169511878,
                longitude: -122.42184275
            },
            image_url: "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            distance: ' 1604.23',
            transactions: ["pickup", "delivery"]
        }, */
    ] as Array<RestaurantsType>,
    filteredRestaurants: [] as Array<RestaurantsType>,
    priceLevel: '' as PriceLevelType | '',
    isClosed: true,
    mapCenter: { lat: 50, lng: 25 }
}
export const getRestaurantsThunk = (): ThunkType => async (dispatch: Dispatch) => {
    try {
        let data = await resturantsAPI.getRestaurants();
        dispatch(actions.setRestaurantsAC(data))
        //@ts-ignore
        let newCoordinates = Object.values(data[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })
        //@ts-ignore
        dispatch(actions.setMapCenter(newCoordinates))
    }
    catch (error: any) { alert(error.message) }
}
export const searchRestaurantsThunk = (term: string, location: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        let data = await resturantsAPI.getNewRestaurants(term, location);
        dispatch(actions.setRestaurantsAC(data))
        dispatch(actions.setFilteredRestaurantsAC([]))
        dispatch(actions.setRestaurantsAC(data));
        //@ts-ignore
        let newCoordinates = Object.values(data[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })
        //@ts-ignore
        dispatch(actions.setMapCenter(newCoordinates))
    }
    catch (error: any) { alert(error.message) }
}
export type InitialStateType = typeof initialState;
const mainReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MAIN/SET_RESTAURANTS": {
            return {
                ...state, restaurants: [...action.restaurants]
            }
        }
        case "MAIN/SET_FILTERED_RESTAURANTS": {
            return {
                ...state, filteredRestaurants: [...action.filteredRestaurants]
            }
        }
        case "MAIN/SET_PRICE_LEVEL": {
            return {
                ...state,
                priceLevel: action.priceLevel
            }
        }
        case "MAIN/IS_CLOSED": {
            return {
                ...state, isClosed: action.isClosed
            }
        }
        case "MAIN/MAP_CENTER": {
            return {
                ...state, mapCenter: action.mapCenter
            }
        }
        default: return state
    }
}


export default mainReducer
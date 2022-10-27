import { Dispatch } from "redux"
import { resturantsAPI } from "../api/api"
import { RestaurantsType, CategoryType, SortType } from "../types/types"
import { BaseThunkType, InferActionsType } from "./store"

export type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setRestaurantsAC: (restaurants: Array<RestaurantsType>) => {
        return {
            type: "MAIN/SET_RESTAURANTS",
            restaurants: restaurants
        } as const
    },
    setPriceLevelAC: (priceLevel: string) => {
        return {
            type: "MAIN/SET_PRICE_LEVEL",
            priceLevel: priceLevel
        } as const
    },
    setLocationAC: (location: string) => {
        return {
            type: "MAIN/SET_LOCATION",
            location: location
        } as const
    },
    setTermAC: (term: string) => {
        return {
            type: "MAIN/SET_TERM",
            term: term
        } as const
    },
    setSortByAC: (sortBy: SortType) => {
        return {
            type: "MAIN/SET_SORT_BY",
            sortBy: sortBy
        } as const
    },
    isFetchingAC: (isFetching: boolean) => {
        return {
            type: "MAIN/IS_FETCHING",
            isFetching: isFetching
        } as const
    },
    isClosedAC: (isClosed: boolean) => {
        return {
            type: "MAIN/IS_CLOSED",
            isClosed: isClosed
        } as const
    },
    isOffersDeliveryAC: (isOffersDelivery: boolean) => {
        return {
            type: "MAIN/IS_OFFERS_DELIVERY",
            isOffersDelivery: isOffersDelivery
        } as const
    },
    isOffersPickUpAC: (isOffersPickUp: boolean) => {
        return {
            type: "MAIN/IS_OFFERS_PICKUP",
            isOffersPickUp: isOffersPickUp
        } as const
    },
    isPopUpActiveAC: (isPopUpActive: boolean) => {
        return {
            type: "MAIN/IS_POP_UP_ACTIVE",
            isPopUpActive: isPopUpActive
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
    priceLevel: '1,2,3,4',
    term: 'restaurants' as string,
    location: 'New York' as string,
    categories: null as null | Array<CategoryType>,
    openNow: false,
    isClosed: false,
    isOffersDelivery: false,
    isOffersPickUp: false,
    sortBy: 'best_match' as SortType,
    isPopUpActive: false,
    isFetching: false,
    mapCenter: { lat: 50, lng: 25 }
}
export const getRestaurantsThunk = (): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(actions.isFetchingAC(true))
        let data = await resturantsAPI.getRestaurants()
        dispatch(actions.isFetchingAC(false))
        dispatch(actions.setRestaurantsAC(data))
        //@ts-ignore
        let newCoordinates: { lat: number, lng: number } = Object.values(data[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })
        dispatch(actions.setMapCenter(newCoordinates))
    }
    catch (error: any) {
        dispatch(actions.isFetchingAC(false))
        alert(error.message)
    }
}
export const searchRestaurantsThunk = (term: string, location: string, price: string, open_now: boolean, sortBy: SortType): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(actions.isFetchingAC(true))
        let data = await resturantsAPI.getNewRestaurants(term, location, price, open_now, sortBy);
        dispatch(actions.isFetchingAC(false))
        dispatch(actions.setRestaurantsAC(data))
        dispatch(actions.isClosedAC(true))
        //dispatch(actions.setPriceLevelAC('1,2,3,4'))
        dispatch(actions.setRestaurantsAC(data));
        //@ts-ignore
        let newCoordinates: { lat: number, lng: number } = Object.values(data[0].coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })
        dispatch(actions.setMapCenter(newCoordinates))
    }
    catch (error: any) {
        dispatch(actions.isFetchingAC(false))
        alert(error.message)
    }
}
export type InitialStateType = typeof initialState;
const mainReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MAIN/SET_RESTAURANTS": {
            return {
                ...state, restaurants: [...action.restaurants]
            }
        }
        case "MAIN/SET_PRICE_LEVEL": {
            return {
                ...state,
                priceLevel: action.priceLevel
            }
        }
        case "MAIN/SET_LOCATION": {
            return {
                ...state,
                location: action.location
            }
        }
        case "MAIN/SET_TERM": {
            return {
                ...state,
                term: action.term
            }
        }
        case "MAIN/SET_SORT_BY": {
            return {
                ...state,
                sortBy: action.sortBy
            }
        }
        case "MAIN/IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "MAIN/IS_CLOSED": {
            return {
                ...state,
                isClosed: action.isClosed
            }
        }
        case "MAIN/IS_POP_UP_ACTIVE": {
            return {
                ...state,
                isPopUpActive: action.isPopUpActive
            }
        }
        case "MAIN/IS_OFFERS_DELIVERY": {
            return {
                ...state, isOffersDelivery: action.isOffersDelivery
            }
        }
        case "MAIN/IS_OFFERS_PICKUP": {
            return {
                ...state, isOffersPickUp: action.isOffersPickUp
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
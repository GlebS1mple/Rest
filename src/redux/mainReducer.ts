import { Dispatch } from "redux"
import { resturantsAPI } from "../api/api"
import { RestaurantsType, PriceLevelType } from "../types/types"
import { BaseThunkType, InferActionsType } from "./store"

type ActionsTypes = InferActionsType<typeof actions>
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
}

type ThunkType = BaseThunkType<ActionsTypes>

let initialState = {
    restaurants: [] as Array<RestaurantsType>,
    filteredRestaurants: [] as Array<RestaurantsType>,
    priceLevel: '' as PriceLevelType | '',
    isClosed: true
}

export const getRestaurantsThunk = (): ThunkType => async (dispatch: Dispatch) => {
    try {
        let data = await resturantsAPI.getRestaurants();
        dispatch(actions.setRestaurantsAC(data));
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
                ...state, priceLevel: action.priceLevel
            }
        }
        case "MAIN/IS_CLOSED": {
            return {
                ...state, isClosed: action.isClosed
            }
        }
        default: return state
    }
}


export default mainReducer
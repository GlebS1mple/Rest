import { Dispatch } from "redux"
import { resturantsAPI } from "../api/api"
import { RestaurantType, ReviewType, } from "../types/types"
import { BaseThunkType, InferActionsType } from "./store"

export type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setRestaurantAC: (restaurant: RestaurantType) => {
        return {
            type: "RESTAURANT/SET_RESTAURANT",
            restaurant: restaurant
        } as const
    },
    setRestaurantReviewsAC: (reviews: Array<ReviewType>) => {
        return {
            type: "RESTAURANT/SET_RESTAURANT_REVIEWS",
            restaurantReviews: reviews
        } as const
    },
    setCenterAC: (center: { lat: number, lng: number }) => {
        return {
            type: "RESTAURANT/SET_CENTER",
            center: center
        } as const
    },
}
// errors

type ThunkType = BaseThunkType<ActionsTypes>


let initialState = {
    restaurant: {} as RestaurantType,
    center: { lat: 50, lng: 25 },
    restaurantReviews: [] as Array<ReviewType>
}
export const getRestaurantThunk = (id: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        let data = await resturantsAPI.getRestaurant(id);
        //@ts-ignore
        dispatch(actions.setCenterAC(Object.values(data.coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })))
        dispatch(actions.setRestaurantAC(data))
    }
    catch (error: any) { alert(error.message) }
}
export const getRestaurantReviewsThunk = (id: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        let data = await resturantsAPI.getRestaurantReviews(id);
        dispatch(actions.setRestaurantReviewsAC(data))
    }
    catch (error: any) { alert(error.message) }
}
export type InitialStateType = typeof initialState;
const restaurantReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "RESTAURANT/SET_RESTAURANT": {
            return {
                ...state,
                restaurant: action.restaurant
            }
        }
        case "RESTAURANT/SET_RESTAURANT_REVIEWS": {
            return {
                ...state,
                restaurantReviews: action.restaurantReviews
            }
        }
        case "RESTAURANT/SET_CENTER": {
            return {
                ...state,
                center: action.center
            }
        }
        default: return state
    }
}


export default restaurantReducer
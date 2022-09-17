import { Dispatch } from "redux"
import { resturantsAPI } from "../api/api"
import { RestaurantsType } from "../types/types"
import { AppStateType, BaseThunkType, InferActionsType } from "./store"

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setRestaurantsAC: (restaurants: Array<RestaurantsType>) => {
        return {
            type: "MAIN/SET_RESTAURANTS",
            restaurants: restaurants
        } as const
    },
}

type ThunkType = BaseThunkType<ActionsTypes>

let initialState = {
    restaurants: [] as Array<RestaurantsType>
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
        default: return state
    }
}


export default mainReducer
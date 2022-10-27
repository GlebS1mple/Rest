import { applyMiddleware, compose, combineReducers, createStore, Action, AnyAction } from "redux";
import mainReducer from "./mainReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import restaurantReducer from "./restaurantReducer";
import { configureStore } from "@reduxjs/toolkit";


let reducers = combineReducers({
    main: mainReducer,
    restaurant: restaurantReducer
});

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type BaseThunkType<A extends AnyAction, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
let state: AppStateType;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
});
composeEnhancers(
    applyMiddleware(thunkMiddleware)
)
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.__store__ = store;
export default store;
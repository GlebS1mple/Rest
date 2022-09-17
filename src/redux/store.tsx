import { applyMiddleware, compose, combineReducers, createStore, Action } from "redux";
import mainReducer from "./mainReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";


let reducers = combineReducers({
    main: mainReducer,
});

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
let state: AppStateType;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.__store__ = store;
export default store;
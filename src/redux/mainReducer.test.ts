import { resturantsAPI } from '../api/api';
import { PriceLevelType, RestaurantsType, RestaurantType } from '../types/types';
import mainReducer, { actions, getRestaurantsThunk, InitialStateType, searchRestaurantsThunk } from './mainReducer';

let state = {
    restaurants: [],
    isOffersDelivery: false,
    isOffersPickUp: false,
    location: 'New York',
    categories: null,
    openNow: false,
    term: 'restaurants',
    sortBy: 'best_match',
    priceLevel: '1,2,3,4',
    isClosed: true,
    isPopUpActive: false,
    isFetching: false,
    mapCenter: { lat: 40.73061, lng: -73.935242 }
}
jest.mock("./../api/api")
const restaurantsAPIMock = resturantsAPI as jest.Mocked<typeof resturantsAPI>
const result: Array<RestaurantsType> = [{
    alias: '',
    categories: [{ alias: '', title: '' }],
    coordinates: { latitude: 0, longitude: 0 },
    display_phone: '',
    distance: '',
    id: '',
    image_url: '',
    is_closed: true,
    location: {
        address1: '',
        address2: '',
        address3: '',
        city: '',
        country: '',
        display_address: [''],
        state: '',
        zip_code: '',
    },
    name: '',
    phone: '',
    price: '',
    rating: 0,
    review_count: 0,
    transactions: [''],
    url: '',
}]

restaurantsAPIMock.getRestaurants.mockReturnValue(Promise.resolve(result))

test('should handle getRestaurantsThunk', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => { };
    const thunk = getRestaurantsThunk()
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    let data = await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(8)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.isFetchingAC(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.isClosedAC(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setPriceLevelAC('1,2,3,4'))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setSortByAC('best_match'))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.setLocationAC('NY'))
    expect(dispatchMock).toHaveBeenNthCalledWith(6, actions.setTermAC('restaurants'))
    expect(dispatchMock).toHaveBeenNthCalledWith(7, actions.isFetchingAC(false))
    //@ts-ignore
    expect(dispatchMock).toHaveBeenNthCalledWith(8, actions.setRestaurantsAC(data))
    //expect(dispatchMock).toHaveBeenNthCalledWith(9, actions.setMapCenter({ lat: 40.730610, lng: -73.935242 }))
    window.alert = jsdomAlert;
})
test('should handle searchRestaurantsThunk', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => { };
    const thunk = searchRestaurantsThunk('restaurants', 'NY', '1,2,3,4', false, 'best_match')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    let data = await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.isFetchingAC(true))
    //@ts-ignore
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setRestaurantsAC(data))
    window.alert = jsdomAlert;
})
test('should return the initial state', () => {
    expect(mainReducer(undefined, { type: 'MAIN/IS_CLOSED', isClosed: true })).toEqual(state)
})

test('should handle MAIN/IS_CLOSED', () => {
    const isClosedAction = {
        type: 'MAIN/IS_CLOSED',
        isClosed: false
    };
    //@ts-ignore
    expect(mainReducer({}, isClosedAction)).toEqual({
        isClosed: false
    });
});
test('should handle MAIN/MAP_CENTER', () => {
    const setMapCenterAction = {
        type: 'MAIN/MAP_CENTER',
        mapCenter: { lat: 50, lng: 25 }
    };
    //@ts-ignore
    expect(mainReducer({}, setMapCenterAction)).toEqual({
        mapCenter: { lat: 50, lng: 25 }
    });
});
test('should handle MAIN/SET_PRICE_LEVEL', () => {
    const priceLevelAction: PriceLevelType = '1,2,3,4'
    //@ts-ignore
    expect(mainReducer({}, actions.setPriceLevelAC(priceLevelAction))).toEqual({
        priceLevel: '1,2,3,4',

    });
});
test('should handle MAIN/SET_LOCATION', () => {
    const location: string = 'NY'
    //@ts-ignore
    expect(mainReducer({}, actions.setLocationAC(location))).toEqual({
        location: 'NY',
    });
});

test('should handle MAIN/SET_RESTAURANTS', () => {
    const previousState: InitialStateType = {
        restaurants: [],
        priceLevel: "1,2,3,4",
        isClosed: false,
        isOffersDelivery: false,
        isOffersPickUp: false,
        term: 'restaurants',
        location: 'NY',
        categories: null,
        isFetching: false,
        openNow: true,
        mapCenter: { lat: 0, lng: 0 },
        isPopUpActive: false,
        sortBy: 'best_match',
    }
    const restaurants: RestaurantsType[] = [{
        alias: 'Starbacks',
        categories: [{ alias: 'Starbacks', title: 'Starbacks' }],
        coordinates: { latitude: 0, longitude: 0 },
        display_phone: '',
        distance: '',
        id: '',
        image_url: '',
        is_closed: true,
        location: {
            address1: '12',
            address2: '14',
            address3: '25',
            city: 'London',
            country: 'England',
            display_address: [''],
            state: '',
            zip_code: '',
        },
        name: 'Starbacks',
        phone: '',
        price: '$$',
        rating: 4.2,
        review_count: 200,
        transactions: [''],
        url: '',
    }]
    expect(mainReducer(previousState, actions.setRestaurantsAC(restaurants))).toEqual({
        restaurants: restaurants,
        priceLevel: "1,2,3,4",
        isClosed: false,
        isOffersDelivery: false,
        isOffersPickUp: false,
        term: 'restaurants',
        location: 'NY',
        categories: null,
        openNow: true,
        sortBy: 'best_match',
        isFetching: false,
        isPopUpActive: false,
        mapCenter: { lat: 0, lng: 0 }
    });
});
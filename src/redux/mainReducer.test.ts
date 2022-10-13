import { resturantsAPI } from '../api/api';
import { PriceLevelType, RestaurantsType } from '../types/types';
import mainReducer, { actions, getRestaurantsThunk, InitialStateType, searchRestaurantsThunk } from './mainReducer';

let state = {
    restaurants: [],
    filteredRestaurants: [],
    priceLevel: '',
    isClosed: true,
    mapCenter: { lat: 50, lng: 25 }
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
    const thunk = getRestaurantsThunk()
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    let data = await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    //@ts-ignore
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setRestaurantsAC(data))
})
test('should handle searchRestaurantsThunk', async () => {
    const thunk = searchRestaurantsThunk('restaurants', 'NY')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    let data = await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    //@ts-ignore
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setRestaurantsAC(data))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setFilteredRestaurantsAC([]))
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
    const priceLevelAction: PriceLevelType = '$$'
    //@ts-ignore
    expect(mainReducer({}, actions.setPriceLevelAC(priceLevelAction))).toEqual({
        priceLevel: '$$',

    });
});
test('should handle MAIN/SET_FILTERED_RESTAURANTS', () => {
    const previousState: InitialStateType = {
        restaurants: [],
        filteredRestaurants: [],
        priceLevel: "",
        isClosed: false,
        mapCenter: { lat: 0, lng: 0 }
    }
    const filteredRestaurants: RestaurantsType[] = [{
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
    expect(mainReducer(previousState, actions.setFilteredRestaurantsAC(filteredRestaurants))).toEqual({
        filteredRestaurants: [{
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
        }], restaurants: [],
        priceLevel: "",
        isClosed: false,
        mapCenter: { lat: 0, lng: 0 }
    });
});
test('should handle MAIN/SET_RESTAURANTS', () => {
    const previousState: InitialStateType = {
        restaurants: [],
        filteredRestaurants: [],
        priceLevel: "",
        isClosed: false,
        mapCenter: { lat: 0, lng: 0 }
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
        restaurants: [{
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
        }],
        filteredRestaurants: [],
        priceLevel: "",
        isClosed: false,
        mapCenter: { lat: 0, lng: 0 }
    });
});
import { resturantsAPI } from '../api/api';
import { PriceLevelType, RestaurantsType } from '../types/types';
import mainReducer, { actions, ActionsTypes, getRestaurantsThunk,searchRestaurantsThunk } from './mainReducer';

let state = {
    restaurants: [],
    filteredRestaurants: [],
    priceLevel: '',
    isClosed: true
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
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.setRestaurantsAC(data))
})
test('should handle searchRestaurantsThunk', async () => {
    const thunk = searchRestaurantsThunk()
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    let data = await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.setRestaurantsAC(data))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.setFilteredRestaurantsAC([]))
})
test('should return the initial state', () => {
    expect(mainReducer(undefined, {})).toEqual(state)
})

test('should handle MAIN/IS_CLOSED', () => {
    const isClosedAction = {
        type: "MAIN/IS_CLOSED",
        isClosed: false
    };
    expect(mainReducer({}, isClosedAction)).toEqual({
        isClosed: false
    });
});
test('should handle MAIN/SET_PRICE_LEVEL', () => {
    const priceLevelAction:PriceLevelType = '$$'
    expect(mainReducer({},actions.setPriceLevelAC(priceLevelAction))).toEqual({
        priceLevel: '$$'
    });
});
test('should handle MAIN/SET_FILTERED_RESTAURANTS', () => {
    const previousState: RestaurantsType[] = []
    const filteredRestaurants: RestaurantsType[]= [{
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
        }]
    });
});
test('should handle MAIN/SET_RESTAURANTS', () => {
    const previousState: RestaurantsType[] = []
    const restaurants: RestaurantsType[]= [{
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
        }]
    });
});
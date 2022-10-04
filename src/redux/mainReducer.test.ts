import { resturantsAPI } from '../api/api';
import { PriceLevelType, RestaurantsType } from '../types/types';
import mainReducer, { actions, ActionsTypes, getRestaurantsThunk } from './mainReducer';

let state = {
    restaurants: [],
    filteredRestaurants: [],
    priceLevel: '',
    isClosed: true
}
jest.mock("./../api/api")
const restaurantsAPIMock = resturantsAPI
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
//@ts-ignore
restaurantsAPIMock.getRestaurants.mockReturnValue(Promise.resolve(result))

test('should handle getRestaurantsThunk', async () => {
    const thunk = getRestaurantsThunk()
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
})
test('should return the initial state', () => {
    //@ts-ignore
    expect(mainReducer(undefined, {})).toEqual(state)
})

test('should handle MAIN/IS_CLOSED', () => {
    const isClosedAction = {
        type: "MAIN/IS_CLOSED",
        isClosed: false
    };
    //@ts-ignore
    expect(mainReducer({}, isClosedAction)).toEqual({
        isClosed: false
    });
});
test('should handle MAIN/SET_FILTERED_RESTAURANTS', () => {
    const filteredRestaurantsAction = {
        type: "MAIN/SET_FILTERED_RESTAURANTS",
        filteredRestaurants: []
    };
    //@ts-ignore
    expect(mainReducer({}, filteredRestaurantsAction)).toEqual({
        filteredRestaurants: []
    });
});

/* test('should handle a todo being added to an existing list', () => {
  const previousState: Todo[] = [
    { text: 'Run the tests', completed: true, id: 0 }
  ]

  expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
    { text: 'Run the tests', completed: true, id: 0 },
    { text: 'Use Redux', completed: false, id: 1 }
  ])
})  */
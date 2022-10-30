import { resturantsAPI } from '../api/api';
import { RestaurantType, ReviewType } from '../types/types';
import restaurantReducer, { actions, getRestaurantReviewsThunk, getRestaurantThunk, InitialStateType } from './restaurantReducer';


let state = {
    restaurant: {},
    center: { lat: 50, lng: 25 },
    restaurantReviews: []
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    restaurantsAPIMock.getRestaurant.mockClear()
})
jest.mock("./../api/api")
const restaurantsAPIMock = resturantsAPI as jest.Mocked<typeof resturantsAPI>
const stateRestaurant: RestaurantType = {
    alias: '',
    categories: [{ alias: '', title: '' }],
    coordinates: { latitude: 0, longitude: 0 },
    display_phone: '',
    distance: '',
    id: '',
    image_url: '',
    is_closed: true,
    is_claimed: true,
    location: {
        address1: '',
        address2: '',
        address3: '',
        city: '',
        country: '',
        display_address: [''],
        state: '',
        zip_code: '',
        cross_streets: ''
    },
    name: '',
    phone: '',
    price: '',
    rating: 0,
    review_count: 0,
    transactions: [''],
    url: '',
    photos: [''],
    special_hours: [{
        date: '',
        isClosed: false,
        start: '',
        end: '',
        is_overNight: false
    }],
    hours: [{
        open: [{
            day: 0,
            start: '',
            end: '',
            is_overNight: false
        }],
        hours_type: '',
        is_open_now: true
    }]
}
const review: Array<ReviewType> = [{
    id: '',
    rating: 4,
    user: {
        id: '',
        profile_url: '',
        image_url: '',
        name: '',
    },
    text: '',
    time_created: '',
    url: ''
}]

test('should return the initial state', () => {
    expect(restaurantReducer(undefined, { type: 'RESTAURANT/SET_CENTER', center: { lat: 50, lng: 25 } })).toEqual(state)
})

restaurantsAPIMock.getRestaurantReviews.mockReturnValue(Promise.resolve(review))
test('should handle getRestaurantReviewsThunk', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => { };
    const thunk = getRestaurantReviewsThunk("hdiuRS9sVZSMReZm4oV5SA")
    let data = await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    //@ts-ignore
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setRestaurantReviewsAC(data))
    window.alert = jsdomAlert;
})

test('should handle RESTAURANT/SET_RESTAURANT', () => {
    const previousState: InitialStateType = {
        restaurant: stateRestaurant,
        center: { lat: 50, lng: 25 },
        restaurantReviews: []
    }
    expect(restaurantReducer(previousState, actions.setRestaurantAC(stateRestaurant))).toEqual({
        restaurant: stateRestaurant,
        center: { lat: 50, lng: 25 },
        restaurantReviews: []
    });
});

test('should handle RESTAURANT/SET_RESTAURANT_REVIEWS', () => {
    const previousState: InitialStateType = {
        restaurant: stateRestaurant,
        center: { lat: 50, lng: 25 },
        restaurantReviews: []
    }
    expect(restaurantReducer(previousState, actions.setRestaurantReviewsAC(review))).toEqual({
        restaurant: stateRestaurant,
        center: { lat: 50, lng: 25 },
        restaurantReviews: review
    });
});

test('should handle RESTAURANT/SET_CENTER', () => {
    const previousState: InitialStateType = {
        restaurant: stateRestaurant,
        center: { lat: 50, lng: 25 },
        restaurantReviews: review
    }
    expect(restaurantReducer(previousState, actions.setCenterAC({ lat: 60, lng: 35 }))).toEqual({
        restaurant: stateRestaurant,
        center: { lat: 60, lng: 35 },
        restaurantReviews: review
    });
});

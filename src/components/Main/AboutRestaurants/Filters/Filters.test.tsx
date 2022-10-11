import React from 'react';
import userEvent from "@testing-library/user-event";
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import { PriceLevelType, RestaurantsType } from '../../../../types/types';
import Filters from './Filters';
import { actions } from '../../../../redux/mainReducer';

const mockStore = configureMockStore([]);
let store: any
beforeEach(() => {
    store = mockStore({
        restaurants: [
            /* {
                rating: 4,
                price: "$",
                phone: "+14152520800",
                id: "E8RJkjfdcwgtyoPMjQ_Olg",
                alias: "four-barrel-coffee-san-francisco",
                is_closed: true,
                categories: [
                    {
                        alias: "coffee",
                        title: "Coffee & Tea"
                    }
                ],
                display_phone: '2',
                review_count: 1738,
                name: "Four Barrel Coffee",
                url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
                coordinates: {
                    latitude: 37.7670169511878,
                    longitude: -122.42184275
                },
                image_url: "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
                location: {
                    city: "San Francisco",
                    country: "US",
                    address2: "",
                    address3: "",
                    state: "CA",
                    address1: "375 Valencia St",
                    zip_code: "94103"
                },
                distance: ' 1604.23',
                transactions: ["pickup", "delivery"]
            }, */
        ] as Array<RestaurantsType>,
        filteredRestaurants: [] as Array<RestaurantsType>,
        priceLevel: '' as PriceLevelType | '',
        isClosed: true
    })
    store.dispatch = jest.fn();
})

const render = (component: any) => {
    <Provider store={store}>
        {component}
    </Provider>
}

test('should render restaurants ', () => {
    render(<Filters />);
});
test('should button ', () => {
    render(<Filters />);
    userEvent.click(screen.getByTestId('price'));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        actions.setPriceLevelAC("$$")
    );
});
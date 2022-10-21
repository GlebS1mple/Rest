import axios from "axios";
import { RestaurantsType, RestaurantType, SortType } from "../types/types";

export const resturantsAPI = {
    getRestaurants() {
        const options = {
            method: 'GET',
            url: 'http://localhost:6069/restaurants',
            params: {
                term: 'restaurants',
                location: 'NewYork',
            }
        }
        return axios.request<Array<RestaurantsType>>(options).then(response => { return response.data });
    },
    getNewRestaurants(term: string, location: string, price: string, open_now: boolean, sort_by: SortType) {
        const options = {
            method: 'GET',
            url: 'http://localhost:6069/restaurants',
            params: {
                term: term,
                location: location,
                price: price,
                open_now: open_now,
                sort_by: sort_by
            }
        }
        return axios.request<Array<RestaurantsType>>(options).then(response => { return response.data });
    },
    getRestaurant(id: string) {
        const options = {
            method: 'GET',
            url: 'http://localhost:6069/restaurant',
            params: {
                id: id,
            }
        }
        return axios.request<RestaurantType>(options).then(response => { return response.data });
    },
    /*     getTodos() {
            const options = {
                method: 'GET',
                url: 'http://localhost:6069/todos',
            }
            return axios.request(options).then(response => { return response.data });
        } */
}
import axios from "axios";
import { RestaurantsType } from "../types/types";

export const resturantsAPI = {
    getRestaurants() {
        const options = {
            method: 'GET',
            url: 'http://localhost:6069/restaurants',
            params: {
                term: 'restaurants',
                location: 'NewYork'
            }
        }
        return axios.request<Array<RestaurantsType>>(options).then(response => { return response.data });
    },
    getNewRestaurants(term: string, location: string) {
        const options = {
            method: 'GET',
            url: 'http://localhost:6069/restaurants',
            params: {
                term: term,
                location: location
            }
        }
        return axios.request<Array<RestaurantsType>>(options).then(response => { return response.data });
    },

    /*     getTodos() {
            const options = {
                method: 'GET',
                url: 'http://localhost:6069/todos',
            }
            return axios.request(options).then(response => { return response.data });
        } */
}
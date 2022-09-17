import axios from "axios";

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
        return axios.request(options).then(response => { return response.data });
    },
    /*     getTodos() {
            const options = {
                method: 'GET',
                url: 'http://localhost:6069/todos',
            }
            return axios.request(options).then(response => { return response.data });
        } */
}
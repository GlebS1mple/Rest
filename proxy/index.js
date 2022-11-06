
import express from 'express'
/* const { createProxyMiddleware } = require('http-proxy-middleware') */
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
dotenv.config()
const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

/* app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname))) */

app.use(cors({
    exposedHeaders: '*',
    origin: '*',
}))

app.get('/restaurants', (req, res) => {
    const term = req.query.term
    const location = req.query.location
    const price = req.query.price
    const open_now = req.query.open_now
    const sort_by = req.query.sort_by
    console.log(process.env.API_KEY)
    const options = {
        method: 'GET',
        url: process.env.API_BASE_URL + '/search?',
        params: {
            term: term,
            location: location,
            price: price,
            open_now: open_now,
            sort_by: sort_by
        },
        headers: {
            Authorization: process.env.API_KEY,
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }
    return axios.request(options).then(response => { res.json(response.data.businesses) }).catch((error) => { console.log(error) });
})
app.get('/restaurant', (req, res) => {
    const id = req.query.id
    const options = {
        method: 'GET',
        url: process.env.API_BASE_URL + `/${id}`,
        headers: {
            Authorization: process.env.API_KEY,
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }
    return axios.request(options).then(response => { res.json(response.data) }).catch((error) => { console.log(error) });
})
app.get('/reviews', (req, res) => {
    const id = req.query.id
    const options = {
        method: 'GET',
        url: process.env.API_BASE_URL + `/${id}/reviews`,
        headers: {
            Authorization: process.env.API_KEY,
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }
    return axios.request(options).then(response => { res.json(response.data.reviews) }).catch((error) => { console.log(error) });
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})
/* app.get('/todos', (req, res) => {
    const term = req.query.term
    const location = req.query.location
    const options = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/todos',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }
    return axios.request(options).then(response => { res.json(response.data) }).catch((error) => { console.log(error) });
}) */
/* 
app.get(':endpoint([\\/\\w\\.-]*)', async (req, res) => {
    let endpoint = process.env.API_BASE_URL + req.params.endpoint
    let params = {}
    if (!!process.env.API_TERM_NAME && !!process.env.API_TERM) {
        params[process.env.API_TERM_NAME] = process.env.API_TERM
    }
    for (const [field, value] of Object.entries(req.query)) {
        params[field] = value
    }

    axios.get(endpoint, {
        headers: { Authorization: "Bearer yvxVC64cwuHI6Ezfn6UGLpwswmyHWio2pfb0Qpd5SDhgpTT0ZbddWSX5kutP_W0S2PNnY_InUHtuW7EOZ5615jmooqSbCaznk4Q0LVSSMKbMj8bMUedQqU97Xd8MY3Yx", },
        params: params
    }).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    }) */
/*  const response = await fetch('https://api.yelp.com/v3/businesses/Sa_qcnc7ZgzSOylf3plTRA', {
     headers: { Authorization: "Bearer yvxVC64cwuHI6Ezfn6UGLpwswmyHWio2pfb0Qpd5SDhgpTT0ZbddWSX5kutP_W0S2PNnY_InUHtuW7EOZ5615jmooqSbCaznk4Q0LVSSMKbMj8bMUedQqU97Xd8MY3Yx", }
 })
 res.json(await response.json()) 
})*/
const port = process.env.PORT || 6069
app.listen(port, () => { console.log(`proxy started at ${port}`) })
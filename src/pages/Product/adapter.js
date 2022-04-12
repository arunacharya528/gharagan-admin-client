const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
export const getProducts = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/product`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}


export const getproduct = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/product/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}
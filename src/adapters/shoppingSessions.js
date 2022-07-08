const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');


export const getSessions = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/shoppingSession`,
        headers: {
            'Authorization': `Bearer  ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}


export const deleteCartItem = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/cartItem/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
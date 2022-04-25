const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');


export const getSessions = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/shoppingSession`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

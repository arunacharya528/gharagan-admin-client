const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');


export const getDiscounts = () => {

    let config = {
        method: 'get',
        url: `${apiURL}/discount`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

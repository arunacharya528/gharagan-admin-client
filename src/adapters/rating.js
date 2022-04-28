const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');


export const getRatings = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/productRating`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
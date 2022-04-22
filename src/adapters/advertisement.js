const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;


export const getAdvertisements = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/advertisement`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}

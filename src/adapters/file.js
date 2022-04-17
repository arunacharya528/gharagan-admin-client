const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');
const axios = require('axios');

export const getFiles = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/file`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
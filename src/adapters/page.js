const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;

export const getPages = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/page`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const getPage = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/page/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

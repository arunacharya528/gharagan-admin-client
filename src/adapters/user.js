const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;


export const getUsers = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/user`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
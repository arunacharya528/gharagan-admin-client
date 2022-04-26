const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');
const qs = require('qs');

export const getQAs = () => {

    let config = {
        method: 'get',
        url: `${apiURL}/questionAnswer`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const postQA = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/questionAnswer/`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}
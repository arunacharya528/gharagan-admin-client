const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getAll = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/siteDetail`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const putSiteData = (data, id) => {
    data = qs.stringify(data);

    let config = {
        method: 'put',
        url: `${apiURL}/siteDetail/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}
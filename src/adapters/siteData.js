const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getAll = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/allSiteDetail`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const putSiteData = (token, data, id) => {
    data = qs.stringify(data);

    let config = {
        method: 'put',
        url: `${apiURL}/siteDetail/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}
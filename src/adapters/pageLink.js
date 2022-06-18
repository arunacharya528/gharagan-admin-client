const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getPageLinks = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/pageLink`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const postPageLink = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/pageLink`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}


export const putPageLink = (data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/pageLink/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deletePageLink = (id) => { 
    let config = {
        method: 'delete',
        url: `${apiURL}/pageLink/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
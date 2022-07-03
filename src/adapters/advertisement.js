const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getAdvertisements = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/advertisement`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config);
}


export const postAdvertisement = (token,data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/advertisement`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putAdvertisement = (token,data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/advertisement/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}


export const deleteAdvertisement = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/advertisement/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config);
}
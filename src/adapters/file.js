const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

export const getFiles = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/file`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const postFile = (token,fileData) => {
    let data = new FormData();
    data.append('file', fileData.file);
    data.append('name', fileData.name);

    let config = {
        method: 'post',
        url: `${apiURL}/file`,
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteFile = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/file/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

export const getFiles = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/file`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const postFile = (fileData) => {
    let data = new FormData();
    data.append('file', fileData.file);
    data.append('name', fileData.name);

    let config = {
        method: 'post',
        url: `${apiURL}/file`,
        headers: { "Content-Type": "multipart/form-data" },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteFile = (id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/file/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
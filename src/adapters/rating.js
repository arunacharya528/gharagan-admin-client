const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');


export const getRatings = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productRating`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const deleteRating = (token, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/productRating/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
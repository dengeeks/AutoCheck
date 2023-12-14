import axios from 'axios'


export const getReviewsRequest = ({ setData }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/reviews/`)
    .then((response) => {
        console.log(response)
        setData(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}
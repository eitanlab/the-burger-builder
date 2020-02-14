import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burgerbuilder-cff94.firebaseio.com/'
});

export default instance;
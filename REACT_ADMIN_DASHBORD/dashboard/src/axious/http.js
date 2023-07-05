import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = localStorage.getItem('token');

    console.log("config from interceptors", config);



    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response from inteceptor", response.data)

    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //  console.log("err.response.data", error.response.data)

    return Promise.reject(error);
});

export default axios
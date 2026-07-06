import axios from 'axios';
import { ref } from 'yup';

axios.interceptors.request.use(function
    (config) {

        const {origin}= new URL(config.url);
        const allowedOrigins=[process.env.REACT_APP_BASE_ENDPOINT];
        const token=localStorage.getItem('access-token');
        if(allowedOrigins.includes(origin)){
            config.headers.authorization = token;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


export const fetchProductList = async ({pageParam=0}) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`);
    return response.data;
};

export const fetchProduct = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`);
    return response.data;
};
export const fetchRegister = async (input) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, input);
    return response.data;
};
export const fetchLogin=async (input) => {
     const response = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, input);
     return response.data;
}


export const fetchMe=async()=>{
    const response = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`
    );
    return response.data;
};

export const fetchLogout=async()=>{
    const response = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
        refresh_token: localStorage.getItem('refresh-token')
    }
    );
    return response.data;
}
export const postOrder =async(input)=>{
 const {data}=await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`,
    input

 )  ;
 return data ;
}
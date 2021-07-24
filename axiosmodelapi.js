import axios from "axios"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "https://app.kiranvoleti.com";

const axiosInstance = axios.create({
    baseURL:baseURL,
    // timeout: 5000,
    headers: {
        Authorization: AsyncStorage.getItem('access')
        ? 'JWT ' + AsyncStorage.getItem('access'):null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
    // cancelToken: new axios.CancelToken(c => cancel = c)
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        

        if(typeof error.response === 'undefined') {
            console.log('Network error');
            // window.location.replace('/login')
            // alert('Network error')
            return Promise.reject(error);
        }
        // if(error.response.status === 401){
        //         alert('login 401')
        //         // window.location.replace('/login')
        //         return Promise.reject(error);
        //     }
            if (
                error.response.data.code === 'token_not_valid' ||
                error.response.status === 401
                //  && error.response.statusText === 'Unauthorized'
            ) {

                const refreshToken = AsyncStorage.getItem('refresh');
                if (refreshToken !== 'undefined') {
                    // const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
    
                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    // const now = Math.ceil(Date.now() / 1000);
                    // console.log(tokenParts.exp,'token expire error');
    
                    if (refreshToken) {
                        return axiosInstance
                            .post('/auth/jwt/refresh/', { refresh: refreshToken })
                            .then((response) => {
                                AsyncStorage.setItem('access', response.data.access);
                                AsyncStorage.setItem('refresh', response.data.refresh);
    
                                axiosInstance.defaults.headers['Authorization'] =
                                    'JWT ' + response.data.access;
                                originalRequest.headers['Authorization'] =
                                    'JWT ' + response.data.access;
    
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => {
                                console.log(err);
                                
                            });
                    } else {
                        console.log('Refresh token is expired');
                        
                    }
                } else {
                    console.log('Refresh token not available.');                    
                    
                }



            }
        
    }
)

export default axiosInstance;
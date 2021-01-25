import axios from "axios"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL = "https://app.kiranvoleti.com";

const axiosInstance = axios.create({
    baseURL:baseURL,
    timeout: 5000,
    headers: {
        Authorization: AsyncStorage.getItem('access')
        ? 'JWT ' + AsyncStorage.getItem('access'):null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if(typeof error.response === 'undefined') {
            console.log('Network error');
            return Promise.reject(error);
        }
        if(error.response.status === 401 &&
            originalRequest.url === baseURL + 'auth/jwt/refresh/'){
                console.log('login')
                return Promise.reject(error);
            }
            if (
                error.response.data.code === 'token_not_valid' &&
                error.response.status === 401 &&
                error.response.statusText === 'Unauthorized'
            ) {

                const refreshToken = AsyncStorage.getItem('refresh_token');
                if (refreshToken) {
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
    
                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);
    
                    if (tokenParts.exp > now) {
                        return axiosInstance
                            .post('/auth/jwt/refresh/', { refresh: refreshToken })
                            .then((response) => {
                                AsyncStorage.setItem('access_token', response.data.access);
                                AsyncStorage.setItem('refresh_token', response.data.refresh);
    
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
                        console.log('Refresh token is expired', tokenParts.exp, now);
                        console.log('/login/');
                    }
                } else {
                    console.log('Refresh token not available.');
                    console.log('/login/');
                }



            }
        
    }
)

export default axiosInstance;
import React,{ useEffect, useState } from 'react'
import axiosInstance from '../axiosmodelapi'
import axios from 'axios';


export default function useVideoSearch(query, pageNumber, orderby) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [usertoken,setUsertoken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNzU2NTU1LCJqdGkiOiIzMzVhYjM0NTBlMWI0ZjkzOTBkMDFjZWExOTQ4MWRlZCIsInVzZXJfaWQiOjF9.QcgvNqenoddAGPNP3TlrvQs7n7xmalpeEmA65Mt_2cY')
    
    useEffect(() => {
        setVideos([])
        pageNumber=1
    }, [query,orderby])

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        

    
        setLoading(true)
        setError(false)

        // const bootstrapAsync = async () => {
        //   let userToken;
    
        //   try {
        //     userToken = await AsyncStorage.getItem('access');
        //   } catch (e) {
        //     // Restoring token failed
        //   }
          
        //   await setUsertoken(userToken)
    
          
        // };
    
        // bootstrapAsync();
      


        
        axiosInstance.get('/user/videos_scroll_page/',{
            
            params: { q: query, page: pageNumber, orderby: orderby },
            // headers:{
            //     'Content-Type': 'application/json',
            //     'Authorization': `JWT ${usertoken}`,         
            //     // 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNjcxNzAyLCJqdGkiOiI5NDczYzEzNWIxNzY0YzIxYjcwNTU5YjVkMmFkMGI5YiIsInVzZXJfaWQiOjF9.ltFOnkP6nqjmG1WnKopKSIS4ILIgnkAJH1AGAoxWKW0',
            //     'Accept': 'application/json'
            // },
            
            
        }).then(res => {
            setVideos(prevVideos => {
                return [...new Set([...prevVideos, ...res.data.response])]
            })
            setHasMore(res.data.response.length > 0)
            setLoading(false)
        }).catch(e => {
            // console.log(e.message)
            setLoading(false)
            
            setError(true)
        })
        // return () => cancel()
    }, [query, pageNumber,orderby])

    return { loading, error, videos, hasMore }
}


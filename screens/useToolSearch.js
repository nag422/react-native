import React,{ useEffect, useState } from 'react'
// import axiosInstance from '../axiosmodelapi'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function useToolSearch(query, pageNumber, orderby) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tools, setTools] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [usertoken,setUsertoken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNzU2NTU1LCJqdGkiOiIzMzVhYjM0NTBlMWI0ZjkzOTBkMDFjZWExOTQ4MWRlZCIsInVzZXJfaWQiOjF9.QcgvNqenoddAGPNP3TlrvQs7n7xmalpeEmA65Mt_2cY')
    
useEffect(() => {
    const bootstrapAsync = async () => {
        let userToken;
  
        try {
          userToken = await AsyncStorage.getItem('access');
        } catch (e) {
          // Restoring token failed
        }
        
        await setUsertoken(userToken)
  
        
      };
  
      bootstrapAsync();
}, [])

    useEffect(() => {
        setTools([])
        pageNumber=1
    }, [query,orderby])

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        

    
        setLoading(true)
        setError(false)

        
      


        let cancel
        axios({
            method: 'GET',
            url: 'https://app.kiranvoleti.com/user/tools_scroll_page/',
            params: { q: query, page: pageNumber, orderby: orderby },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${usertoken}`,         
                // 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNjcxNzAyLCJqdGkiOiI5NDczYzEzNWIxNzY0YzIxYjcwNTU5YjVkMmFkMGI5YiIsInVzZXJfaWQiOjF9.ltFOnkP6nqjmG1WnKopKSIS4ILIgnkAJH1AGAoxWKW0',
                'Accept': 'application/json'
            },
            
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTools(prevTools => {
                return [...new Set([...prevTools, ...res.data.response])]
            })
            setHasMore(res.data.response.length > 0)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber,orderby])

    return { loading, error, tools, hasMore }
}


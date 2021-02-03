import React,{ useEffect, useState } from 'react'
import axiosInstance from '../axiosmodelapi'
// import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

export default function useToolSearch(query, pageNumber, orderby) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tools, setTools] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [usertoken,setUsertoken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNzU2NTU1LCJqdGkiOiIzMzVhYjM0NTBlMWI0ZjkzOTBkMDFjZWExOTQ4MWRlZCIsInVzZXJfaWQiOjF9.QcgvNqenoddAGPNP3TlrvQs7n7xmalpeEmA65Mt_2cY')
    


    useEffect(() => {
        setTools([])
        pageNumber=1
    }, [query,orderby])

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        

    
        setLoading(true)
        setError(false)

        
      


        let cancel
        axiosInstance.get('/user/tools_scroll_page/',{
            
            params: { q: query, page: pageNumber, orderby: orderby },
            
            
        }).then(res => {
            setTools(prevTools => {
                return [...new Set([...prevTools, ...res.data.response])]
            })
            setHasMore(res.data.response.length > 0)
            setLoading(false)
        }).catch(e => {
            // console.log(e)
            setLoading(false)
            
            setError(true)
        })
        
    }, [query, pageNumber,orderby])

    return { loading, error, tools, hasMore }
}


import { useEffect, useState } from 'react'
// import axiosInstance from '../axiosmodelapi'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function useArticleSearch(query, pageNumber, orderby) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState([])
    const [hasMore, setHasMore] = useState(false)
    
    useEffect(() => {
        setArticles([])
        pageNumber=1
    }, [query,orderby])

    useEffect(() => {
        // if(!localStorage.getItem('remain')) return;
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'https://app.kiranvoleti.com/user/articles_scroll_page/',
            params: { q: query, page: pageNumber, orderby: orderby },
            headers:{
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${AsyncStorage.getItem('access')}`,         
                'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNjA3Njk5LCJqdGkiOiI1NGU5N2NmOGFmOTE0MTgyOTVmNmEzZGY2MTE5NDMxNiIsInVzZXJfaWQiOjF9.liiOrQf2A0yeZ3Orn3yCR6iLTftRoBt7_Lqbzqr3wjI',
                'Accept': 'application/json'
            },
            
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setArticles(prevArticles => {
                return [...new Set([...prevArticles, ...res.data.response])]
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

    return { loading, error, articles, hasMore }
}


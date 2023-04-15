import axios from 'axios'
import React from 'react'

export const getAllSongs = async() => {

    const data = await axios.get(`/api`)
    const {feed} = data.data
    return feed 
    
}

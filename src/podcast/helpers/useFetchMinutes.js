import {useState, useEffect }from 'react'

import { getPodcastMinutes } from './getPodcastMinutes';



export const useFetchMinutes = (id) => {

 
  //const [allSongsList, setAllSongs] = useState([])
  const [minutes, setMinutes] = useState([])
 


  useEffect(() => {
  
    getAllMinutes();
  }, [])





  const getAllMinutes = async () => {
    
    const songs = await getPodcastMinutes(id)
    setMinutes(songs)
  }
  
  /*
  const getAllPodCasts = async () => {
    const songs = await getAllSongs()
    const {entry} = songs
    setAllSongs(entry)
  }*/
  
  return{
    //allPodCastDetail:allPodCastDetail,
    minutes:minutes
  }
}

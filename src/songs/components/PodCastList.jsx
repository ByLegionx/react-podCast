import React, {useEffect, useState} from 'react'

import { useFetchSongs } from '../../podcast/helpers/useFetchSongs'
import { PodCastCard } from './PodCastCard';
import "../styles/songsStyles.css"
import { useAppContext } from '../../context/ContextProvider';
import { PodCaster } from './PodCaster';
import { getAllSongs } from '../../podcast/helpers/getAllSongs';

export const PodCastList = () => {

  const {contextState, setContextState} = useAppContext();
  const { allSongsList} = useFetchSongs(contextState, setContextState);
  const [searchText, setSearchText] = useState('');
  const [filterArray, setFilterArray] = useState(null)
  const [filterAuthArray, setFilterAuthArray] = useState(null)


  useEffect(() => {
    setContextState({
      ...contextState,
      AllPodCasts: allSongsList,
    })  
  }, [allSongsList])

  const onHandleInputChange = (event) => {
    if(event.target.value === "") setFilterArray(null)
    else{
      setSearchText(event.target.value.toLowerCase());
      const filteredArray = allSongsList.filter(podcast => {

      const label = podcast['im:name']['label'].toLowerCase()
      return label.includes(searchText);

      });

      const filteredAuthorArray = allSongsList.filter(podcast => {
        const label = podcast['im:artist']['label'].toLowerCase()
        if(!filteredArray.some(f => f['im:artist']['label'].toLowerCase() === label)) {
          return label.includes(searchText);
        }
      
      });
      
      setFilterAuthArray(filteredAuthorArray)
      setFilterArray(filteredArray)
    }

  }
  
  return(
    <>
      <div className='container'>
        <PodCaster/>
        <div className="search-container">
          <div className="number-search">
            <div className='both-entries'>
              <div className="search-result-count">
                {allSongsList && filterArray=== null ? allSongsList.length : filterArray.length + filterAuthArray.length}
              </div>
              <div>
                <input type="text" className="search-input" placeholder="Filter pordcast..." onChange={onHandleInputChange}/>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fourSongs'>
          <div className='songs-container'>
            { allSongsList && filterArray=== null ?
                allSongsList.map(song =>(
                  <PodCastCard key={song['id']['attributes']['im:id']} {...song}/>
                ))
              : 
              (
                <>
                  {filterArray.map(song => (
                    <PodCastCard key={song['id']['attributes']['im:id']} {...song} />
                  ))}
                  {filterAuthArray.map(song => (
                    <PodCastCard key={song['id']['attributes']['im:id']} {...song} />
                  ))}
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

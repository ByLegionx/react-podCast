import React, { useMemo, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/ContextProvider';
import { PodCaster } from '../../songs/components/PodCaster';
import { getPodCastById } from '../helpers/getPodCastById';

import "../styles/podCastStyle.css"
import { useFetchMinutes } from '../helpers/useFetchMinutes';
import { getPodcastMinutes } from '../helpers/getPodcastMinutes';
import { PodCastNavbar } from '../../songs/components/PodCastNavbar';
import { getDataAndDate } from '../helpers/getDataAndDate';

export const PodCastInfoPage = () => {
  
  const {contextState, setContextState} = useAppContext();
  const [response, setResponse] = useState(null)
  
  const {id, ...rest} = useParams();

  const podcast = useMemo(()=>getPodCastById(id,contextState), [id]);

  const {minutes} = useFetchMinutes(podcast['id']['attributes']['im:id']);

  useEffect(() => {

    setContextState({
      ...contextState,
      actualView: "Vista detalle",
      ActualViewPodCasts: [podcast],
    })

    const getAllMinutes = async () => {
      const songs = await getPodcastMinutes(podcast['id']['attributes']['im:id'])

      setResponse(songs);
    }
    getAllMinutes();
  }, [])

  return (
    <div className='main-div-container'>
      <PodCaster/>
      <div className='div-main-container'>
      <PodCastNavbar/>
  
        <div className='episodes-container'>
          <div className='podCast-minutes-list'>
              <header className='header-episode'>
                <h2>Episodes : {minutes.resultCount-1}</h2>
              </header>
          </div>
          <div className='table-container-div'>
         
              <table className='table-tag'>
                <thead>
                  <tr>
                    <th style={{textAlign: "left"}}>Title</th>
                    <th style={{textAlign: "right"}}>Date</th>
                    <th style={{textAlign: "right"}}>Duration</th>
                  </tr>
                </thead>
                <tbody>

                {response !== null && response.results.slice(1).map((minute) => {
                    
                  const {time, formattedDate} = getDataAndDate(minute)
                 
                  const {trackId, trackName} = minute

                    return (
                      <tr key={trackId} style={{ height: '50px', borderBottom:1 }}>
                        <td style={{ textAlign: "left" }}>
                        <Link to={`episode/${trackId}`} className= "link-episodes" >
                          {/*{`podcast/${song['id']['attributes']['im:id']}` */}
                            {trackName}
                          </Link>                     
                        </td>
                        <td style={{ textAlign: "right" }}>{formattedDate}</td>
                        <td style={{ textAlign: "right" }}>{time}</td>
                        

                      </tr>
                    )
                })}
                </tbody>
                </table>
            
          </div>
        </div>
      </div>

    </div>
  )
}

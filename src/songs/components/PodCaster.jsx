import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/ContextProvider';

export const PodCaster = () => {

  const {contextState} = useAppContext();

  return (
    <div className='title-container'>
        <div className='header-link-loading'>
          <div className="podcast-title">
            <Link to="/" className="podcast-link">
                <b>Podcaster</b>
            </Link>
          </div>
          {contextState.AllPodCasts.length === 0  && (
          <div className="circle">
            <div className="inner-circle"></div>
          </div>
        
          ) }
        </div>
       
    </div>
  )
}

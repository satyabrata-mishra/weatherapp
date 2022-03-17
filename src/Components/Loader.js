import React from 'react'
import loader from '../Images/loader.gif';
import './Loader.css'
export default function Loader() {
  return (
    <div className='loader'><img src={loader} alt="" /></div>
  )
}

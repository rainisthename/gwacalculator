import React from 'react'
import destination from '../src/assets/destination.png'
const Home = () => {
  return (
    <div className='mx-[10%] my-[10%] justify-center'>
      <div className='grid grid-cols-2 gap-4 justify-center mb-4 place-items-center'>
      <div>
      <div className='text-1xl mb-4'>Pasyaran is a mobile app that provides tourists with information on hundreds of tourist destinations in Ilocos Norte. Its aim is to make traveling in Ilocos Norte as convenient and enjoyable as possible.</div>
      <button className='p-3 border-2 w-[40%] transition duration-500 hover:scale-105 rounded-md border-maroon hover:border-black'>Learn More</button>
      </div>
      <img src={destination} alt="Destination" height="200" />
      </div>
    </div>
  )
}

export default Home
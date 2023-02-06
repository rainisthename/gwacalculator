import React from 'react'
import destination from '../../src/assets/destination.png'
const Hero = () => {
  return (
    <>
    <div className='mx-[10%] justify-center'> 
      <div className='grid md:grid-cols-2 gap-4 justify-center mb-4 place-items-center sm:grid-cols-1'>
      <div className='content'>
      <h3 className='mb-5 font-Poppins text-gray-700'>Pasyaran is a mobile app that provides tourists with information on hundreds of tourist destinations in Ilocos Norte.</h3>
      <button className='font-Poppins p-3 border-2 w-[35%] transition duration-500 hover:scale-105 rounded-md border-maroon hover:border-black'>Learn More</button>
      </div>
      <img src={destination} alt="Destination" />
      </div>
    </div>
    </>
  )
}

export default Hero
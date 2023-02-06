import React from 'react'
import second from '../../src/assets/second.png'

const SecondRow = () => {
  return (
    <div className='bg-gray-200 px-[10%]'>

    <div className='grid md:grid-cols-2 gap-4 justify-center place-items-center sm:grid-cols-1'>
    <img src={second} alt="Destination" style={{height:500}} />
    <p className='text-lg font-Poppins text-gray-700'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
    </div>
  )
}

export default SecondRow
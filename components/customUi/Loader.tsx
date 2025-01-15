import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-96'>
        <div className='animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12'></div>
    </div>
  )
}

export default Loader
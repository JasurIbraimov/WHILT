import Image from 'next/image'
import React from 'react'

const Spinner = () => {
  return (
    <Image
        priority
        className='m-auto my-5'
        src={"/assets/images/spinner.svg"}
        alt='Spinner'
        width={150}
        height={150}
        
    />
  )
}

export default Spinner
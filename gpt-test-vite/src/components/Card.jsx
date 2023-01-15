import React from 'react'
import { useState } from 'react'

const Card = ({txt, choice, setChoice, id, right}) => {
    const handleClick = (e) => {
        e.preventDefault()
        choice === id ? setChoice(100) : setChoice(id);
    }
  return (
    <>
    
        <div onClick={handleClick} className={` ${right === id ? 'text-green-400 border-l-[5px] border-l-green-400' : choice === id ? 'border-l-[5px] border-l-red-400 text-red-400' : 'border-l-[5px] border-l-gray-600'}  hover:bg-gray-700 hover:cursor-pointer flex w-[500px] h-auto min-h-[100px] items-center justify-center bg-gray-600 text-center px-4 py-2 flex-wrap text-white font-semibold text-lg`}>
            <p>{txt}</p>
        </div>

    </>
  )
}

export default Card
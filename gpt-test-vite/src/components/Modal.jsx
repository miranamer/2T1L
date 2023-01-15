import React from 'react'
import { useState } from 'react'

const Modal = () => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

  return (
    <>
    
    <div className=" flex items-center justify-center h-screen">
        <div className=" w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 fixed bg-black/70 ">
            
        </div>
    </div>


    </>
  )
}

export default Modal
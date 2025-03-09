import React, { useState } from 'react'
import { FaEraser } from "react-icons/fa";
const Eraser = ({changeColor,changeEraserClicked}) => {
  return (
    <div className='eraser'>
         <FaEraser onClick={()=>{changeEraserClicked(); changeColor("#000000")}} style={{cursor:"pointer"}}/>
    </div>
  )
}

export default Eraser

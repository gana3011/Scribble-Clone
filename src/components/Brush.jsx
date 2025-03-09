import React from 'react'
import { FaPaintBrush } from "react-icons/fa";
const Brush = ({brushClicked, changeBrushClicked, changePreviousColor}) => {
  return (
    <div>
      <FaPaintBrush style={{cursor:"pointer"}} onClick={()=>changeBrushClicked()}/>
    </div>
  )
}

export default Brush

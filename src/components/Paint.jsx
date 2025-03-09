import React from 'react'
import { LuPaintBucket } from "react-icons/lu";
const Paint = ({changePaintClicked}) => {
  return (
    <div>
      <LuPaintBucket onClick={()=>changePaintClicked()} style={{cursor:"pointer"}}/>
    </div>
  )
}

export default Paint

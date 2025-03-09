import React, { useState } from 'react'
import { PopoverPicker } from './PopoverPicker';

const ColorPicker = ({color, changeColor}) => {

  return (
    <div>
      <PopoverPicker color={color} onChange={changeColor} />
    </div>
  )
}

export default ColorPicker

import React, { useEffect, useRef, useState } from 'react'
import ColorPicker from './ColorPicker';
import StrokesizePicker from './StrokesizePicker';

const WIDTH = 780;
const HEIGHT = 500;

const DrawingBoard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const pos = useRef({
      x:0,
      y:0
    });

    const [color, setColor] = useState("#ffffff");
    const colorRef = useRef(color);
    const changeColor = (newColor) =>{
      setColor(newColor);
    }

    const [strokeSize, setStrokeSize] = useState(2);
    const strokeSizeRef = useRef(strokeSize);
    const changeStrokeSize = (size) => {
      setStrokeSize(size);
    };

    const isDrawing = useRef(false);

    const drawLine = (context,x1,y1,x2,y2)=>{
      context.beginPath();
      context.strokeStyle = colorRef.current;
      context.lineWidth = strokeSizeRef.current
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    }

    const startDrawing = (e) =>{
      pos.current.x = e.offsetX;
      pos.current.y = e.offsetY;
      isDrawing.current = true;
    }

    const drawing = (e) =>{
      if(isDrawing.current){
        drawLine(contextRef.current,pos.current.x, pos.current.y,e.offsetX,e.offsetY);
        pos.current.x = e.offsetX;
        pos.current.y = e.offsetY;
      }
    }

    const stopDrawing = (e) =>{
      if(isDrawing.current){
        drawLine(contextRef.current,pos.current.x, pos.current.y,e.offsetX,e.offsetY);
        pos.current.x = 0;
        pos.current.y = 0;
        isDrawing.current = false;
      }
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        canvas.addEventListener("mousedown",startDrawing);
        canvas.addEventListener("mousemove",drawing);
        canvas.addEventListener("mouseup",stopDrawing);
        return()=>{
          canvas.removeEventListener("mousedown", startDrawing);
          canvas.removeEventListener("mousemove", drawing);
          canvas.removeEventListener("mouseup", stopDrawing);
        }
    },[]);

    useEffect(() => {
      colorRef.current = color;
    }, [color]);

    useEffect(() => {
      strokeSizeRef.current = strokeSize;
    }, [strokeSize]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <ColorPicker color={color} changeColor={changeColor}/>
      <StrokesizePicker strokeSize={strokeSize} changeStrokeSize={changeStrokeSize} color={color} />
    </div>
  )
}

export default DrawingBoard

import React, { useEffect, useRef, useState } from 'react'
import ColorPicker from './ColorPicker';
import StrokesizePicker from './StrokesizePicker';
import Eraser from './Eraser';
import Brush from './Brush';
import Paint from './Paint';
import { getPixelColor, hexToRGBA, isClosedShape, isSameColor } from '../utils/helper';
import { floodFill } from '../utils/floodfill';

const WIDTH = 780;
const HEIGHT = 500
const BACKGROUND_COLOR = '#000000';

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

    const previousColor = useRef("");
  
    const [strokeSize, setStrokeSize] = useState(2);
    const strokeSizeRef = useRef(strokeSize);
    const changeStrokeSize = (size) => {
      setStrokeSize(size);
    };
    const [eraserClicked, setEraserClicked] = useState(false);

    const changeEraserClicked = () =>{
      if(!eraserClicked){
      setEraserClicked(true);
      setBrushClicked(false);
      setPaintClicked(false);
      previousColor.current = color;
      }
    }

    const [brushClicked, setBrushClicked] = useState(true);

    const changeBrushClicked = () =>{
      if(!brushClicked){
      setBrushClicked(true);
      setEraserClicked(false);
      setPaintClicked(false);
      changeColor(previousColor.current);
      }
    }

    const fillCanvas = (x, y) => {
      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      if (!canvas || !ctx) return;
    
      const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
      const pixels = imageData.data;
    
      const targetColor = getPixelColor(pixels, x, y, WIDTH, HEIGHT); // Get color at clicked point
      const fillColor = hexToRGBA(color); // Convert selected color to RGBA
    
      if (isSameColor(targetColor, fillColor)) return; // Avoid redundant fills
    
      // Check if the area is enclosed
      if (!isClosedShape(pixels, x, y, WIDTH, HEIGHT,BACKGROUND_COLOR)) {
        return;
      }
    
      floodFill(pixels, x, y, targetColor, fillColor, WIDTH, HEIGHT);
      ctx.putImageData(imageData, 0, 0);
    };
    

    const [paintClicked, setPaintClicked] = useState(false);

    const changePaintClicked = () =>{
      if(!paintClicked){
        setPaintClicked(true);
      }
    }

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
        context.fillStyle = BACKGROUND_COLOR;
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
      <canvas 
  ref={canvasRef} 
  onClick={(e) => {
    if (paintClicked) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      fillCanvas(x, y);
    }
  }}
/>
      <Brush brushClicked = {brushClicked} changeBrushClicked={changeBrushClicked}/>
      <StrokesizePicker strokeSize={strokeSize} changeStrokeSize={changeStrokeSize} color={color} />
      <Eraser changeColor={changeColor} changeEraserClicked={changeEraserClicked}/>
      {!eraserClicked && 
            <ColorPicker color={color} changeColor={changeColor}/>
      }
      <Paint changePaintClicked={changePaintClicked}/>
    </div>
  )
}

export default DrawingBoard

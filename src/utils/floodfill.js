import { getPixelColor, isSameColor, setPixelColor } from "./helper";

export const floodFill = (pixels, x, y, targetColor, fillColor,WIDTH, HEIGHT) => {
    const stack = [[x, y]];
    const width = WIDTH;
    const height = HEIGHT;
  
    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      const index = (cy * width + cx) * 4;
  
      if (!isSameColor(getPixelColor(pixels, cx, cy, WIDTH, HEIGHT), targetColor)) continue;
  
      setPixelColor(pixels, index, fillColor);
  
      if (cx > 0) stack.push([cx - 1, cy]); // Left
      if (cx < width - 1) stack.push([cx + 1, cy]); // Right
      if (cy > 0) stack.push([cx, cy - 1]); // Up
      if (cy < height - 1) stack.push([cx, cy + 1]); // Down
    }
  };


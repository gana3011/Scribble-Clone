export const getPixelColor = (pixels, x, y, WIDTH, HEIGHT) => {
    const index = (y * WIDTH + x) * 4;
    return [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
  };
  
export const setPixelColor = (pixels, index, color) => {
    pixels[index] = color[0]; // R
    pixels[index + 1] = color[1]; // G
    pixels[index + 2] = color[2]; // B
    pixels[index + 3] = color[3]; // A
  };
  
export const isSameColor = (color1, color2) => {
    return (
      color1[0] === color2[0] &&
      color1[1] === color2[1] &&
      color1[2] === color2[2] &&
      color1[3] === color2[3]
    );
  };
  
export const hexToRGBA = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b, 255]; // Alpha = 255 (Fully opaque)
  };
  
export const isClosedShape = (pixels, x, y, width, height,BACKGROUND_COLOR) => {
  const stack = [[x, y]];
  const visited = new Set();

  while (stack.length) {
    const [cx, cy] = stack.pop();
    if (cx < 0 || cy < 0 || cx >= width || cy >= height) return false; // Found an opening

    const key = `${cx},${cy}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const colorAtPixel = getPixelColor(pixels, cx, cy, width, height);
    
    if (!isSameColor(colorAtPixel, BACKGROUND_COLOR)) continue; // Stop at boundaries

    stack.push([cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]);
  }
  return true; // Found a closed shape
};



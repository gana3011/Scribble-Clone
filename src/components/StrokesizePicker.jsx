import React, { useState } from 'react';

const StrokeSizePicker = ({ strokeSize, changeStrokeSize, color }) => {
    const sizes = [3, 5, 7, 10, 15, 20, 25];
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div style={{ position: 'relative', padding: '10px' }}>
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: strokeSize,
                    height: strokeSize,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '2px solid #000',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            />

         
            {isExpanded && (
                <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    position: 'absolute', 
                    top: '100%', 
                    left: 0, 
                    background: 'white', 
                    padding: '10px', 
                    borderRadius: '8px', 
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {sizes.map(size => (
                        <div 
                            key={size}
                            onClick={() => {
                                changeStrokeSize(size);
                                setIsExpanded(false); 
                            }}
                            style={{
                                width: size,
                                height: size,
                                borderRadius: '50%',
                                backgroundColor: strokeSize === size ? color : '#ddd',
                                border: '2px solid #000',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StrokeSizePicker;

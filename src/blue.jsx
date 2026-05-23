import React from 'react'

const blue = () => {
  return (
    <div style={{
      height: "clamp(25px, 4vw, 50px)", 
      width: "clamp(25px, 4vw, 50px)", 
      border: "1px solid rgba(255, 255, 255, 0.3)", 
      backgroundColor: "#0000FF", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      opacity: 0.7,
    }}>
      
    </div>
  )
}

export default blue

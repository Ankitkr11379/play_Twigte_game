import React from 'react';

const red = (props) => {
  return (
    <div
      onClick={!props.disabled ? props.onClick : null} // Prevent clicks if disabled
      style={{
        position: "relative",
        backgroundColor: props.highlighted ? "black" : "red", // Change color to yellow if highlighted
        border: "1px solid red",
        width: "clamp(25px, 4vw, 50px)",
        cursor: props.disabled ? "not-allowed" : "pointer",
        height: "clamp(25px, 4vw, 50px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        borderRadius: "4px",
        fontSize: "clamp(12px, 2vw, 18px)",
        fontWeight: "bold",
        transition: "all 0.2s ease",
        boxShadow: props.highlighted ? "0 0 10px rgba(255, 255, 0, 0.8)" : "0 2px 4px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        if (!props.disabled) {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled) {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = props.highlighted ? "0 0 10px rgba(255, 255, 0, 0.8)" : "0 2px 4px rgba(0, 0, 0, 0.3)";
        }
      }}
    >
      {props.value}
      <div
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          fontSize: "clamp(8px, 1.5vw, 12px)",
          color: "black",
          fontWeight: "bold",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "2px",
          padding: "1px 3px",
          lineHeight: 1,
        }}
      >
        {props.index}
      </div>
    </div>
  );
};

export default red;

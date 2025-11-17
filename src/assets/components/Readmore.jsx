import React, { useState, useRef, useEffect } from "react";

const Readmore = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      if (isExpanded) {
        content.style.height = content.scrollHeight + "px"; // Expand
      } else {
        content.style.height = "0px"; // Collapse
      }
    }
  }, [isExpanded]);

  return (
    <div className="readmore-container">
      <div
        ref={contentRef}
        className="readmore-content"
        style={{ height: "0px", overflow: "hidden", transition: "height 0.3s ease" }}
      >
        {children}
      </div>
      <button className="header_btn" onClick={toggleReadMore}>
        <span>{isExpanded ? "Read Less" : "Read More"}</span> →
      </button>
    </div>
  );
};

export default Readmore;

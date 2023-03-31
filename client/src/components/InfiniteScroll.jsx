import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";

const InfiniteScroll = ({ children, getMore, hasMore }) => {
  const pageEndRef = useRef(null);

  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getMore();
        }
      });

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore]);

  return (
    <>
      {children}
      <div style={{ marginLeft: "25%" }}>
        {hasMore ? (
          <CircularProgress ref={pageEndRef} />
        ) : (
          // <h3 style={{ marginRight: "45%" }}>Không có bài viết mới</h3>
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default InfiniteScroll;

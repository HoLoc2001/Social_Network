import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useAppSelector } from "../redux/store";

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
      <div style={{ marginLeft: "28%" }}>
        {hasMore ? <CircularProgress ref={pageEndRef} /> : <CircularProgress />}
      </div>
    </>
  );
};

export default InfiniteScroll;

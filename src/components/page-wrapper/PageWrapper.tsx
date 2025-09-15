import React from "react";
import "./page-wrapper.scss";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div className="page-wrapper">{children}</div>;
};

export default PageWrapper;

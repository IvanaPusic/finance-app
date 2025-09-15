import React from "react";
import "./not-found.scss";
import { Link } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404 Page Not Found</h1>
      <button className="not-found__btn">
        <Link to="/">Go back</Link>
      </button>
    </main>
  );
};

export default NotFoundPage;

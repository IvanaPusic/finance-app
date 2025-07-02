import React, { Fragment } from "react";
import AuthDebug from "../components/AuthDebug";

const OverviewPage: React.FC = () => {
  return (
    <Fragment>
      <h1>Overview</h1>
      <AuthDebug />
    </Fragment>
  );
};

export default OverviewPage;

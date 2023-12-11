import AppRoutes from "app/routes"
import React from "react";
import AppFooter from "app/shared/layout/footer/footer";
import {Footer} from "antd/es/layout/layout";

function PageContent() {
  return <div className="pageContent">
    <AppRoutes></AppRoutes>
    <AppFooter></AppFooter>
  </div>
}

export default PageContent;

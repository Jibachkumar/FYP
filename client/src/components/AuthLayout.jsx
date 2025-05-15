import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Spin } from "antd";

function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const authStatus = useSelector((state) => state.auth.status);
  //console.log(authStatus);

  useEffect(() => {
    if (authentication && !authStatus) {
      // Save the current page location to redirect after login
      // console.log("Redirecting to login with location:", location.pathname);

      navigate("/login", { state: { from: location.pathname }, replace: true });
    } else if (location.pathname === "/login" && authStatus) {
      navigate("/", { replace: true });
    }

    setLoader(false);
  }, [authStatus, authentication, navigate, location]);

  return loader ? <Spin /> : <>{children}</>;
}

export default Protected;

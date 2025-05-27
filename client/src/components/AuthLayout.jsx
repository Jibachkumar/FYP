import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Spin } from "antd";

function Protected({ children, authentication = true, role = "user" }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);
  const userRole = useSelector(
    (state) => state.auth?.userData?.data?.user?.role
  );
  console.log(userRole);
  //console.log(authStatus);

  useEffect(() => {
    if (authentication && !authStatus) {
      // Save the current page location to redirect after login
      // console.log("Redirecting to login with location:", location.pathname);

      navigate("/login", { state: { from: location.pathname }, replace: true });
    } else if (
      authStatus &&
      location.pathname === "/login" &&
      userRole === "admin"
    ) {
      navigate("/admin", { replace: true });
    } else if (location.pathname === "/login" && authStatus) {
      navigate("/", { replace: true });
    } else if (
      authentication &&
      authStatus &&
      role === "admin" &&
      userRole !== "admin"
    ) {
      navigate("/", { replace: true });
    } // ✅ Redirect admin users to /admin if they're logged in and not already there

    setLoader(false);
  }, [authStatus, authentication, navigate, location, role, userRole]);

  return loader ? <Spin /> : <>{children}</>;
}

export default Protected;

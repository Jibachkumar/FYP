import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Spin } from "antd";

function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  //console.log(authStatus);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <Spin /> : <>{children}</>;
}

export default Protected;

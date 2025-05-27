import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function useRedirectToast() {
  const location = useLocation();
  // Show toast if sessionStorage has a message
  useEffect(() => {
    const msg = sessionStorage.getItem("toastMessage");
    // console.log(msg);
    if (msg) {
      toast.success(msg);
      sessionStorage.removeItem("toastMessage");
    }
  }, [location.pathname]);
}

export { useRedirectToast };

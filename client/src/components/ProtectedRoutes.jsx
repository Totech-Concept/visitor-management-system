import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentStaff } from "../../../server/utils/auth";

export default function ProtectedRoutes({ children }) {

    const [authenticated, setAuthenticated] = useState(null);
    
    useEffect(() => {
      const checkAuthentication = async () => {
        const staff = await getCurrentStaff();

        setAuthenticated(!!staff);
      };

      checkAuthentication();
    }, []);
  
    if (authenticated === null) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <p>Checking authentication...</p>
        </div>
      );
    }

    if (!authenticated) {
      return <Navigate to="/staff-login" replace />
    }

    return children;
}

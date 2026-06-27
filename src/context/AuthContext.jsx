import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../features/auth/services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useCurrentUser();

  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  useEffect(() => {
    if (data?.user) {
      setAuth({
        isAuthenticated: true,
        user: data.user,
        accessToken: null,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
        accessToken: null,
      });
    }
  }, [data]);

  const login = (user) => {
    setAuth({
      isAuthenticated: true,
      user,
      accessToken: null,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        loading: isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);

//   const [auth, setAuth] = useState({
//     isAuthenticated: false,
//     user: null,
//     accessToken: null,
//   });

//   // =========================
//   // LOAD AUTH FROM STORAGE
//   // =========================
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       const storedToken = localStorage.getItem("accessToken");

//       if (storedUser) {
//         setAuth({
//           isAuthenticated: true,
//           user: JSON.parse(storedUser),
//           accessToken: storedToken || null,
//         });
//       }
//     } catch (error) {
//       console.error("Auth Restore Error:", error);

//       localStorage.removeItem("user");
//       localStorage.removeItem("accessToken");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // =========================
//   // LOGIN
//   // =========================
//   const login = (user, accessToken) => {
//     try {
//       localStorage.setItem("user", JSON.stringify(user));

//       if (accessToken) {
//         localStorage.setItem("accessToken", accessToken);
//       }

//       setAuth({
//         isAuthenticated: true,
//         user,
//         accessToken: accessToken || null,
//       });
//     } catch (error) {
//       console.error("Login Error:", error);
//     }
//   };

//   // =========================
//   // UPDATE TOKEN
//   // =========================
//   const updateAccessToken = (accessToken) => {
//     localStorage.setItem("accessToken", accessToken);

//     setAuth((prev) => ({
//       ...prev,
//       accessToken,
//     }));
//   };

//   // =========================
//   // LOGOUT
//   // =========================
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");

//     setAuth({
//       isAuthenticated: false,
//       user: null,
//       accessToken: null,
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...auth,
//         loading,
//         login,
//         logout,
//         updateAccessToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // =========================
// // CUSTOM HOOK
// // =========================
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

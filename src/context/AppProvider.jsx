import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const username = useMemo(() => user?.name ?? "", [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        username,
        loading,
        selectedClient,
        setSelectedClient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
};

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [decryptedUser, setDecryptedUser] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);

// useEffect(() => {
//   try {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setDecryptedUser(user);
//     }
//   } catch (error) {
//     console.error("Failed to parse user:", error);
//   }
// }, []);

//   const username = useMemo(() => {
//     return decryptedUser?.name?.trim() || "";
//   }, [decryptedUser]);

//   const value = {
//     username,
//     decryptedUser,
//     selectedClient,
//     setSelectedClient,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useApp = () => {
//   const context = useContext(AppContext);

//   if (!context) {
//     throw new Error("useApp must be used within AppProvider");
//   }

//   return context;
// };

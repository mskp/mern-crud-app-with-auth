import { createContext, useContext, useState } from "react";
import { COLLECTION_ID, DB_ID, account, database, uniqueId } from "../appwrite";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedin, setLoggedin] = useState(false);

  async function login(credentials) {
    try {
      const { email, password } = credentials;
      const result = await account.createEmailSession(email, password);
      if (result) {
        const info = await account.get();
        setUser(info);
        setLoggedin(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Some error occured", error);
    }
  }
  async function signup(credentials) {
    try {
      const { email, password, fullName } = credentials;
      const result = await account.create(uniqueId, email, password, fullName);
      await database.createDocument(DB_ID, COLLECTION_ID, user.$id, {
        age: credentials.age,
        location: credentials.location,
      });

      if (result) return true;
      return false;
    } catch (error) {
      console.error("Some error occured", error);
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser({});
      setLoggedin(false);
    } catch (error) {
      console.error("Some error occured", error);
    }
  }

  async function deleteAccount() {
    try {
      await account.deleteIdentity(user.$id);
      await database.deleteDocument(DB_ID, COLLECTION_ID, user.$id);
      setUser({});
      setLoggedin(false);
    } catch (error) {
      console.error("Account couldn't be deleted");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedin,
        setLoggedin,
        setUser,
        login,
        signup,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

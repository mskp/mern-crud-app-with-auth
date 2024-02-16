import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [accountDeletionModalVisible, setAccountDeletionModalVisible] =
    useState(false);

  return (
    <ModalContext.Provider
      value={{
        logoutModalVisible,
        accountDeletionModalVisible,
        setLogoutModalVisible,
        setAccountDeletionModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

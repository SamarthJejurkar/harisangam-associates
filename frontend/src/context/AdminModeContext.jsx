import { createContext, useContext } from "react";

const AdminModeContext = createContext({ isEditing: false });

export function AdminModeProvider({ isEditing = true, children }) {
  return (
    <AdminModeContext.Provider value={{ isEditing }}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  return useContext(AdminModeContext);
}
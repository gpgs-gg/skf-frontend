import React, { createContext, useContext, useState, useCallback } from "react";

const UnsavedChangesContext = createContext();

export const UnsavedChangesProvider = ({ children }) => {
  // store multiple forms safely (scalable)
  const [dirtyForms, setDirtyForms] = useState({});

  // register/update a form's dirty state
  const setDirty = useCallback((formId, isDirty) => {
    setDirtyForms((prev) => ({
      ...prev,
      [formId]: isDirty,
    }));
  }, []);

  // check if ANY form is dirty
  const hasUnsavedChanges = Object.values(dirtyForms).some(Boolean);

  // reset one form
  const resetForm = useCallback((formId) => {
    setDirtyForms((prev) => ({
      ...prev,
      [formId]: false,
    }));
  }, []);

  // reset all
  const resetAll = useCallback(() => {
    setDirtyForms({});
  }, []);

  return (
    <UnsavedChangesContext.Provider
      value={{
        setDirty,
        hasUnsavedChanges,
        resetForm,
        resetAll,
      }}
    >
      {children}
    </UnsavedChangesContext.Provider>
  );
};

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);

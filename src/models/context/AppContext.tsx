import { Context, createContext, useContext } from "react";
import ApplicationContext from "@/models/context/ApplicationContext";

// Stores context data
let AppContext: Context<ApplicationContext>;

// Creates application wrapper to be used as top root
function ApplicationWrapper({ children, appContext }: any) {
  AppContext = createContext(appContext);

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

// Gives access to the context
function useAppContext(): ApplicationContext {
  return useContext(AppContext);
}

export { useAppContext };
export default ApplicationWrapper;

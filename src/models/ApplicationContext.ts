import { Dispatch, SetStateAction } from "react";

interface ApplicationContext {
  appId: string;
  version: string;
  update: Dispatch<SetStateAction<ApplicationContext>>;
}

export default ApplicationContext;

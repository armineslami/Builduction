import { Dispatch, SetStateAction } from "react";

interface ApplicationContext {
    version: string,
    debug: boolean,
    update: Dispatch<SetStateAction<ApplicationContext>>
}

export default ApplicationContext;
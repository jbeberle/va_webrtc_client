import {createContext, useContext} from "react";


export type WebrtcContextType = {
    sendUserResponse: string;
    setSendUserResponse: (resp: string) => void;
}

export const WebrtcContext = createContext<WebrtcContextType>({
    sendUserResponse: "",
    setSendUserResponse: () => {}
});


export const useWebrtcContext: () => WebrtcContextType = () =>
    useContext(WebrtcContext);

import SocketManager from './SocketManager';
import { createContext } from "react";
import { useSetRecoilState } from 'recoil';
import SocketState from './SocketState';

const sm = new SocketManager();

export const SocketManagerContext = createContext<SocketManager>(sm);

type ProviderProps = {
  children : React.ReactNode;  
};

export function SocketManagerProvider({children} : ProviderProps): JSX.Element
{
    sm.setSocketState = useSetRecoilState(SocketState);

    return <SocketManagerContext.Provider value={sm}>{children}</SocketManagerContext.Provider>;
}

import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DeviceType } from '@/constants/agent';

type AgentProviderProps = {
  children: ReactElement | ReactElement[];
};

export const AgentContext = createContext<{
  deviceType: DeviceType;
  screenWidth: number;
}>(undefined as any);

export function AgentProvider({ children }: AgentProviderProps) {
  const [screenWidth, setScreenWidth] = useState(window?.innerWidth);

  const deviceType = useMemo(() => {
    if (screenWidth <= 520) {
      return DeviceType.MOBILE;
    }
    if (screenWidth < 1023) {
      return DeviceType.TABLET;
    }
    //width > 1000
    return DeviceType.DESKTOP;
  }, [screenWidth]);

  useEffect(() => {
    function onResize() {
      setScreenWidth(window?.innerWidth);
    }

    window?.addEventListener('resize', onResize);
    return () => {
      window?.removeEventListener('resize', onResize);
    };
  }, []);

  const data = useMemo(() => {
    return { screenWidth, deviceType };
  }, [screenWidth, deviceType]);

  return <AgentContext.Provider value={data}>{children}</AgentContext.Provider>;
}

type AgentProps = {
  fallback?: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
  device: DeviceType;
} & (
  | {
      accept: true;
      deny?: never;
    }
  | {
      deny: true;
      accept?: never;
    }
);

export function Agent({ fallback = null, children, device, accept, deny }: AgentProps) {
  const { deviceType } = useContext(AgentContext);
  if (accept) {
    if (device === deviceType) {
      // only show in {{device}} device
      return <>{children}</>;
    }
  }
  if (deny) {
    if (device !== deviceType) {
      // show in all device except {{device}}
      return <>{children}</>;
    }
  }
  return <>{fallback}</>;
}

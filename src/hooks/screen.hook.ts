import { AgentContext } from '../components/agent.provider';
import { DeviceType } from '../constants/agent';
import { useContext } from 'react';

export function useScreenWidth() {
  const { deviceType, screenWidth } = useContext(AgentContext);
  const isMobile = deviceType === DeviceType.MOBILE;
  const isTablet = deviceType === DeviceType.TABLET;
  const isDesktop = deviceType === DeviceType.DESKTOP;
  return { deviceType, screenWidth, isMobile, isTablet, isDesktop };
}

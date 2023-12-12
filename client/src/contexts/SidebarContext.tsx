import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// SIDEBAR CONTEXT
type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};
const SidebarContext = createContext<SidebarContextType | null>(null);
export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) throw Error('Unable to perform task!');
  return value;
}

// SIDEBAR CONTEXT PROVIDER
type SidebarProviderProps = {
  children: ReactNode;
};
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const screenHandler = () => {
      if (!isSmallScreen()) setIsSmallOpen(false);
    };

    window.addEventListener('resize', screenHandler);

    return () => {
      window.removeEventListener('resize', screenHandler);
    };
  }, []);

  function isSmallScreen() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isSmallScreen()) {
      setIsSmallOpen((p) => !p);
      setIsLargeOpen((p) => !p);
    }
  }

  function close() {
    if (isSmallScreen()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider
      value={{ isLargeOpen, isSmallOpen, toggle, close }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

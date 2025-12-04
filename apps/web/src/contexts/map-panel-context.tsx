import { createContext, useState, type ReactNode, useContext } from "react";

interface MapPanelContextType {
    isGeoPickingActive: boolean;
    setIsGeoPickingActive: () => void;
}

const MapPanelContext = createContext<MapPanelContextType | undefined>(undefined);

export const MapPanelProvider = ({ children }: { children: ReactNode }) => {
    const [isGeoPickingActive, setIsGeoPickingActive] = useState(false)

    const contextValue: MapPanelContextType = {
        isGeoPickingActive,
        setIsGeoPickingActive: () => setIsGeoPickingActive(prev => !prev)
    }

    return <MapPanelContext.Provider value={contextValue}>{children}</MapPanelContext.Provider>;
}

export function useMapPanelContext(): MapPanelContextType {
    const context = useContext(MapPanelContext);
  if (context === undefined) {
    throw new Error('useMapPanel must be used within an MapPanelProvider');
  }
  return context;
}
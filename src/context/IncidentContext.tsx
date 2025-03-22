import React, { createContext, useContext, useState } from 'react';
import { Incident, Severity, Status } from '../types/generated';

interface IncidentContextType {
  filters: { severity?: Severity[]; status?: Status[] };
setFilters: React.Dispatch<React.SetStateAction<{ severity?: Severity[]; status?: Status[] }>>;
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  isFormOpen: boolean;
  isDetailedModalOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  setIsDetailedModalOpen: (open: boolean) => void;
  selectedIncidentIds: Set<string>;
  setSelectedIncidentIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<{
    severity?: Severity[];
    status?: Status[];
  }>({});
  
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);
  const [selectedIncidentIds, setSelectedIncidentIds] = useState<Set<string>>(new Set());

  return (
    <IncidentContext.Provider value={{ filters, setFilters, selectedIncident, setSelectedIncident, isFormOpen, setIsFormOpen, isDetailedModalOpen, setIsDetailedModalOpen, selectedIncidentIds, setSelectedIncidentIds }}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidentContext = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidentContext must be used within an IncidentProvider');
  }
  return context;
};

import React from 'react';
import { Incident } from '../types/generated';
import { useIncidentContext } from '../context/IncidentContext';
import SeverityBadge from './SeverityBadge';
import '../styles/SingleIncident.css';

interface SingleIncidentProps {
  incident: Incident;
}

const SingleIncident: React.FC<SingleIncidentProps> = ({ incident }) => {
  const { setSelectedIncident, setIsDetailedModalOpen, selectedIncidentIds, setSelectedIncidentIds } = useIncidentContext();

  const isChecked = selectedIncidentIds.has(incident.id);

  const handleCheckboxChange = () => {
    setSelectedIncidentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(incident.id)) {
        newSet.delete(incident.id);
      } else {
        newSet.add(incident.id);
      }
      return newSet;
    });
  };

  return (
    <tr
      className="incident-row"
      onClick={() => {
        setSelectedIncident(incident);
        setIsDetailedModalOpen(true);
      }}
    >
      <td className="incident-detail" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="incident-detail">{incident.title}</td>
      <td className="incident-detail">{incident.description}</td>
      <td className="incident-detail">
        <SeverityBadge severity={incident.severity} />
      </td>
      <td className="incident-detail">{incident.status}</td>
    </tr>
  );
};

export default SingleIncident;

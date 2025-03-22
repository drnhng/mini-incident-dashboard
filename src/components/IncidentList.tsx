import React, { useEffect, useState } from 'react';
import FiltersBar from './FiltersBar';
import { useGetIncidents } from '../hooks/useGetIncidents';
import { useDeleteIncident } from '../hooks/useDeleteIncident';
import { useIncidentContext } from '../context/IncidentContext';
import SingleIncident from './SingleIncident';
import IncidentForm from './IncidentForm';
import '../styles/IncidentList.css';
import DetailedSingleIncident from './DetailedSingleIncident';
import Pagination from './Pagination';

const IncidentList: React.FC = () => {
  const { incidents, loading, error, refetch } = useGetIncidents();
  const {
    isFormOpen,
    setIsFormOpen,
    isDetailedModalOpen,
    setIsDetailedModalOpen,
    selectedIncident,
    selectedIncidentIds,
    setSelectedIncidentIds,
    filters,
  } = useIncidentContext();
  const { deleteIncident } = useDeleteIncident();

  const incidentsFiltered = incidents.filter((incident) => {
    return (
      (!filters.severity || filters.severity.includes(incident.severity)) &&
      (!filters.status || filters.status.includes(incident.status))
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const incidentsPerPage = 5;
  const startIdx = (currentPage - 1) * incidentsPerPage;
  const paginatedIncidents = incidentsFiltered.slice(startIdx, startIdx + incidentsPerPage);


  useEffect(() => {
    setCurrentPage(1); 
  }, [filters]);

  const handleBulkDelete = async () => {
    const windowConfirm = window.confirm(`Warning: you are about to delete ${selectedIncidentIds.size} incident(s). Would you like to continue with this action?`);
    if (!windowConfirm) return;

    for (let id of selectedIncidentIds) {
      try {
        await deleteIncident({ variables: { id } });
      } catch (err) {
        console.error('Error: failed to delete incident with id: ', id, err);
      }
    }

    setSelectedIncidentIds(new Set());
    refetch();
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error fetching incidents: {error.message}</p>;



  return (
    <div className="incident-list-container">
      <h2 className="incidentlist-title">Mini Incident Dashboard</h2>

      <div className="filters-and-add">
        <FiltersBar />
        <button onClick={() => setIsFormOpen(true)} className="add-button">
          Add
        </button>
      </div>

      <table className="incidentlist-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedIncidents.map((incident) => (
  <SingleIncident key={incident.id} incident={incident} />
))}
        </tbody>
      </table>

      {selectedIncidentIds.size > 0 && (
        <button onClick={handleBulkDelete} className="delete-button">
          Delete Selected
        </button>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(incidentsFiltered.length / incidentsPerPage)}
        onPageChange={setCurrentPage}
      />

      {isFormOpen && <IncidentForm onSuccess={refetch} />}
      {isDetailedModalOpen && selectedIncident && (
        <DetailedSingleIncident
          incident={selectedIncident}
          onClose={() => setIsDetailedModalOpen(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default IncidentList;

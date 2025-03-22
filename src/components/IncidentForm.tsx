import React, { useState } from 'react';
import { useIncidentContext } from '../context/IncidentContext';
import { useAddIncident } from '../hooks/useAddIncident';
import { Severity, Status } from '../types/generated';
import '../styles/IncidentForm.css';

interface IncidentFormProps {
  onSuccess: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSuccess }) => {
  const { setIsFormOpen } = useIncidentContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>(Severity.Low);
  const [status, setStatus] = useState<Status>(Status.Open);

  const { addIncident } = useAddIncident();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addIncident({
        variables: {
          title,
          description,
          severity,
          status,
        },
      });

      onSuccess();
      closeModal();
    } catch (error) {
      console.error('Error creating incident:', error);
    }
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setTitle('');
    setDescription('');
    setSeverity(Severity.Low);
    setStatus(Status.Open);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal} className="modal-close" aria-label="Close">
          ✖
        </button>
        <h2 className="modal-title">New Incident</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="modal-textarea"
          />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as Severity)}
            className="modal-select"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="modal-select"
          >
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
          <div className="modal-button-row">
            <button type="button" onClick={closeModal} className="modal-button cancel">
              Cancel
            </button>
            <button type="submit" className="modal-button submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;

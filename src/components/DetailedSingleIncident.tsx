import React, { useState } from 'react';
import { Incident, Severity, Status } from '../types/generated';
import { useUpdateIncident } from '../hooks/useUpdateIncident';
import '../styles/IncidentForm.css';
import '../styles/DetailedSingleIncident.css'
import SeverityBadge from './SeverityBadge';

interface DetailedSingleIncidentProps {
  incident: Incident;
  onClose: () => void;
  onSuccess: () => void;
}

const DetailedSingleIncident: React.FC<DetailedSingleIncidentProps> = ({
  incident,
  onClose,
  onSuccess,
}) => {
  const { updateIncident } = useUpdateIncident();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: incident.title,
    description: incident.description,
    severity: incident.severity,
    status: incident.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateIncident({
        variables: {
          id: incident.id,
          ...form,
        },
      });
      setIsEditing(false);
      onSuccess();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setForm({
      title: incident.title,
      description: incident.description,
      severity: incident.severity,
      status: incident.status,
    });
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" >
      <div className="modal-content">
        <button onClick={onClose} className="modal-close" aria-label="Close">
          x
        </button>

        <div className="edit-button-wrapper">
          <h2 className="modal-title">Incident Details</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="modal-button submit">
              Edit
            </button>
          )}
        </div>

        <div className="modal-form">
          <div className="detail-row">
            <label className="detail-label">Title:</label>
            {isEditing ? (
              <input
                className="modal-input"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            ) : (
              <p>{form.title}</p>
            )}
          </div>

          <div className="detail-row">
            <label className="detail-label">Description:</label>
            {isEditing ? (
              <textarea
                className="modal-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            ) : (
              <p>{form.description}</p>
            )}
          </div>

          <div className="detail-row">
            <label className="detail-label">Severity: </label>
            {isEditing ? (
              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
                className="modal-select"
              >
                <option value={Severity.Low}>Low</option>
                <option value={Severity.Medium}>Medium</option>
                <option value={Severity.High}>High</option>
              </select>
            ) : (
              <SeverityBadge severity={form.severity as Severity} />
            )}
          </div>

          <div className="detail-row">
            <label className="detail-label">Status:</label>
            {isEditing ? (
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="modal-select"
              >
                <option value={Status.Open}>Open</option>
                <option value={Status.Closed}>Closed</option>
              </select>
            ) : (
              <p>{form.status}</p>
            )}
          </div>

          {isEditing && (
            <div className="modal-button-row">
              <button onClick={handleCancel} className="modal-button cancel">
                Cancel
              </button>
              <button onClick={handleSave} className="modal-button submit">
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedSingleIncident;


import React from 'react';
import { useIncidentContext } from '../context/IncidentContext';
import { Severity, Status } from '../types/generated';
import '../styles/FiltersBar.css';

const severityOptions: Severity[] = [Severity.Low, Severity.Medium, Severity.High];
const statusOptions: Status[] = [Status.Open, Status.Closed];

const FiltersBar: React.FC = () => {
    const { filters, setFilters } = useIncidentContext();

    const toggleSeverity = (value: Severity) => {
        setFilters((prev) => {
            const current = prev.severity || [];
            const updated = current.includes(value)
                ? current.filter((s) => s !== value)
                : [...current, value];
            return {
                ...prev,
                severity: updated.length > 0 ? updated : undefined,
            };
        });
    };

    const toggleStatus = (value: Status) => {
        setFilters((prev) => {
            const current = prev.status || [];
            const updated = current.includes(value)
                ? current.filter((s) => s !== value)
                : [...current, value];
            return {
                ...prev,
                status: updated.length > 0 ? updated : undefined,
            };
        });
    };

    const clearFilters = () => setFilters({});

    return (
        <div className="filters-bar">
            <div className="filter-group">
                <span>Severity</span>
                {severityOptions.map((level) => {
                    const active = filters.severity?.includes(level);
                    return (
                        <button
                            key={level}
                            onClick={() => toggleSeverity(level)}
                            className={`filter-button ${active ? 'active' : ''}`}
                        >
                            {level}
                        </button>
                    );
                })}
            </div>

            <div className="filter-group">
                <span>Status</span>
                {statusOptions.map((status) => {
                    const active = filters.status?.includes(status);
                    return (
                        <button
                            key={status}
                            onClick={() => toggleStatus(status)}
                            className={`filter-button ${active ? 'active' : ''}`}
                        >
                            {status}
                        </button>
                    );
                })}
            </div>

            {(filters.severity?.length || filters.status?.length) && (
                <button onClick={clearFilters} className="clear-filters-button">
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default FiltersBar;

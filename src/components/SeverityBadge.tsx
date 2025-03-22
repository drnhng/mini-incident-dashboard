import React from 'react';
import { Severity } from '../types/generated';
import '../styles/SeverityBadge.css';

interface SeverityBadgeProps {
  severity: Severity;
}

const getClassName = (severity: Severity) => {
  switch (severity) {
    case 'LOW':
      return 'severity-badge severity-low';
    case 'MEDIUM':
      return 'severity-badge severity-medium';
    case 'HIGH':
      return 'severity-badge severity-high';
    default:
      return 'severity-badge';
  }
};

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  return <span className={getClassName(severity)}>{severity}</span>;
};

export default SeverityBadge;

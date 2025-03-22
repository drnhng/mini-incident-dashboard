import { useUpdateIncidentMutation } from "../types/generated";

export const useUpdateIncident = () => {
  const [updateIncident, { loading, error }] = useUpdateIncidentMutation();

  return { updateIncident, loading, error };
};

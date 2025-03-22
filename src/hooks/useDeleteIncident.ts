import { useDeleteIncidentMutation } from "../types/generated";

export const useDeleteIncident = () => {
  const [deleteIncident, { loading, error }] = useDeleteIncidentMutation();

  return { deleteIncident, loading, error };
};

import { useAddIncidentMutation } from "../types/generated";

export const useAddIncident = () => {
  const [addIncident, { loading, error }] = useAddIncidentMutation();

  return { addIncident, loading, error };
};

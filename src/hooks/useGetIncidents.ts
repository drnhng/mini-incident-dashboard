import { useGetIncidentsQuery } from "../types/generated";

export const useGetIncidents = () => {
  const { data, loading, error, refetch } = useGetIncidentsQuery();

  return {
    incidents: data?.getIncidents || [],
    loading,
    error,
    refetch,
  };
};

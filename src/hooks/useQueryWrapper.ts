import { useQuery } from '@tanstack/react-query';

const useQueryWrapper = (
  url: string,
  staleTime: number = Infinity,
  initialData: Array<any> | undefined = undefined,
) => {
  const query = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    staleTime,
    initialData,
  });
  return query;
};

export default useQueryWrapper;

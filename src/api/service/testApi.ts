import { useQuery } from '@tanstack/react-query';
import { customRequest, endPoints } from '@/api/endpoint';
import { TestType } from '@/api/type/testType';

export const getTestApi = async (): Promise<TestType[]> => {
  const res = await customRequest().get(endPoints.test);
  return res.data;
};

export const useGetTestApi = () => {
  return useQuery({
    queryKey: [endPoints.test],
    queryFn: () => getTestApi(),
    throwOnError: true,
    staleTime: 1000 * 60,
  });
};

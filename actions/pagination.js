import { useSWRpages } from "swr";

export const useGetBlogsPages = () => {
  return useSWRpages("index-page", ({offset, withSWR}) => {

  });
};

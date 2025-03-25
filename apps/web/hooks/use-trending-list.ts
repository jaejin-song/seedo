import { API_ROUTES } from "@/const/api";
import { apiInstance } from "@/lib/ky";
import { ListItem } from "@/types/list";
import { useEffect, useState } from "react";

export function useTrendingList() {
  const [data, setData] = useState<ListItem[] | null>(null);

  const fetchTrendingList = async () => {
    try {
      const res = await apiInstance.get(API_ROUTES.LIST.TRENDING.url).json<{
        success: boolean;
        data: ListItem[];
      }>();

      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch trending list: ", err);
    }
  };

  useEffect(() => {
    fetchTrendingList();
  }, []);

  const fetchSearchList = async (search: string) => {
    const searchParams = { search };

    try {
      const res = await apiInstance
        .get(API_ROUTES.LIST.SEARCH.url, {
          searchParams,
        })
        .json<{
          success: boolean;
          data: ListItem[];
        }>();

      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch search list: ", err);
    }
  };

  const updateList = async (search: string) => {
    if (!search) {
      await fetchTrendingList();
      return;
    }

    await fetchSearchList(search);
  };

  return {
    data,
    setData,
    updateList,
    fetchSearchList,
  };
}

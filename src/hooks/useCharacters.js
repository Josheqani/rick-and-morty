import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
        setCharacters(data.results || []);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        setCharacters([]);
        const errorMessage =
          err?.response?.data?.error || err.message || "Something went wrong!";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, query]);

  return { isLoading, characters };
}

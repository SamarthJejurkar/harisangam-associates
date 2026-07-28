import { useEffect, useState } from "react";
import { getSection } from "../api/sections";

export function useSection(sectionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getSection(sectionName)
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch((err) => {
        if (isMounted) setError(err);
        console.error(`Failed to load section "${sectionName}":`, err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [sectionName]);

  return { data, loading, error };
}
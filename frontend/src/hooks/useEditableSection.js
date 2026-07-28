import { useEffect, useState, useCallback } from "react";
import { getSection, updateSection } from "../api/sections";

export function useEditableSection(sectionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getSection(sectionName)
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [sectionName]);

  // Saves one flat field, e.g. saveField("headline", "New headline")
  const saveField = useCallback(
    async (field, value) => {
      setData((prev) => (prev ? { ...prev, [field]: value } : prev)); // optimistic
      const updated = await updateSection(sectionName, { [field]: value });
      setData(updated);
    },
    [sectionName]
  );

  // Saves an entire replacement object/array under one key, e.g. items array
  const saveWhole = useCallback(
    async (patch) => {
      setData((prev) => (prev ? { ...prev, ...patch } : prev)); // optimistic
      const updated = await updateSection(sectionName, patch);
      setData(updated);
    },
    [sectionName]
  );

  return { data, loading, saveField, saveWhole };
}
import { useState, useEffect } from "react";
import { Tweet } from "../types";

// Would make sense to make this hook generic and then build the tweet specifc part around it.

const useLocalStorage = (key: string) => {
  const getSavedValue = (): Tweet[] => {
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  const [value, setValue] = useState<Tweet[]>(getSavedValue());

  const saveItem = (value: Tweet) => {
    const savedValue = getSavedValue();
    // prevent saving duplicates
    for (const tweet of savedValue) {
      if (tweet.id === value.id) {
        return;
      }
    }
    const newValue = [...savedValue, value];
    setValue(newValue);
  };

  const removeItem = (id: number) => {
    const savedValue = getSavedValue();
    console.log(savedValue);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, saveItem, removeItem };
};

export default useLocalStorage;

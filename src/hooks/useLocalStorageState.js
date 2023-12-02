import React, { useEffect, useState } from "react";

export const useLocalStorageState = (initialState, key) => {
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watched));
  }, [watched, key]);
  return [watched, setWatched];
};

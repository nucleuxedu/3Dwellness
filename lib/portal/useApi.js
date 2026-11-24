import { useState, useEffect } from "react";

/** Loads data and reloads whenever deps change. Keeps old data on screen while reloading. */
export function useApi(load, deps) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    load().then((d) => {
      if (live) setData(d);
    });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return data;
}

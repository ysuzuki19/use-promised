import { useCallback, useEffect, useState } from 'react';

export interface Option<T> {
  logging?: boolean;
  placeholder?: T;
  interval?: number | null;
}

const defaultOption: Option<undefined> = {
  logging: false,
  placeholder: undefined,
  interval: null,
};

export function usePromised<T>(
  fn: () => Promise<T>,
  deps: React.DependencyList = [],
  option = defaultOption
) {
  const [data, setData] = useState<T | undefined>(option.placeholder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [flag, setFlag] = useState(false);

  const refresh = useCallback(() => setFlag((f) => !f), [setFlag]);

  useEffect(() => {
    option.interval && setInterval(refresh, option.interval);
  }, [option.interval, refresh]);

  useEffect(() => {
    fn()
      .then((res) => {
        setData(res);
        setSuccess(true);
      })
      .catch(() => {
        setError(false);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, flag]);

  return { data, loading, error, success, refresh };
}

export default usePromised;

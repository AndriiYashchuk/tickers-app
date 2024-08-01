const IDX = (_: any) => _;

type HashFunction = (...args: any []) => string;

export const withCache = <T extends [], R>(
  fn: Function,
  cacheTime = 1000,
  getCacheFomParams: HashFunction = IDX
) => {

  const cache = new Map();

  return async (...args: T): Promise<R> => {
    const hashFromParams = getCacheFomParams(...args);
    if (!cache.has(hashFromParams)) {
      const res = await fn(...args);
      cache.set(hashFromParams, res);

      setTimeout(() => {
        cache.delete(hashFromParams)
      }, cacheTime);
    }

    return cache.get(hashFromParams);
  };
};

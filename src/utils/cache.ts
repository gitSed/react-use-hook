const cachedFetches: Record<string, Promise<any>> = {};

const cachedFetch = (url: string): Promise<any> => {
  if (!cachedFetches[url]) {
    cachedFetches[url] = fetch(url)
      .then(async (res) => ({
        data: await res.json(),
        status: res.status,
        error: res.statusText,
      }))
      .catch((err) => ({
        data: undefined,
        status: 500,
        error: err.message,
      }));
  }

  return cachedFetches[url];
};

export default cachedFetch;

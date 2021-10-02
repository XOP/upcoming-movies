export const mockFetch = (dataFn, delay = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(dataFn()), delay);
  });
  
export const API_EP = 'endpoint';
export const API_KEY = 'key';
export const API_HOST = 'host';
export const DATA_KEY = 'dataKey';

export const mockFetch = (dataFn, delay = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(dataFn()), delay);
  });
  
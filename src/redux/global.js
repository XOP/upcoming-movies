export const STATUS = {
  init: 'init',
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  done: 'done'
};

export const LIST_LIMIT = process.env.REACT_APP_ITEM_LIMIT || 3;

export const LIST_CAP = process.env.REACT_APP_ITEM_CAP || 10;

export const routeNames = {
  LIST: "/",
  ITEM: "/movie/:movie",
};

export const createRoute = (root, id) => {
  return `${root.split(':')[0]}${id}`;
}

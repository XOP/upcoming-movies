/**
 * parseDate
 * @param {ms} date 
 * @returns date in format "01 January 1970"
 */
export const parseDate = (date) => {
  const dateFormat = new Date(date);

  return dateFormat.toLocaleString("en-GB", {
    weekday: undefined,
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * parseDateMonth
 * @param {ms} date 
 * @returns date month in format "January"
 */
export const parseDateMonth = (date) => {
  const dateFormat = new Date(date);

  return dateFormat.toLocaleString("en-GB", {
    month: "long",
  });
};

export const getMoment = () => {
  let moment = { date: null, time: null };
  const date = new Date();
  const today = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
  const now = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  moment = { date: today, time: now };
  return moment;
};

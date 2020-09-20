/**
 * Timestamp in local time
 */
export default () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const tzOffset = (now).getTimezoneOffset() * 60000;
  const time = (new Date(Date.now() - tzOffset)).toISOString().slice(11, 23);
  return `${date} ${time}`;
};

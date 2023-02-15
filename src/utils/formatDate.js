import moment from 'moment';

const formatDate = (date) => {
  const currentDate = moment();
  const inputDate = moment(date);
  const diffInMinutes = currentDate.diff(inputDate, 'minutes');
  const diffInSeconds = currentDate.diff(inputDate, 'seconds');
  const diffInDays = currentDate.diff(inputDate, 'days');
  const diffInWeeks = currentDate.diff(inputDate, 'weeks');
  const diffInMonths = currentDate.diff(inputDate, 'months');

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  } if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }
  return inputDate.format('DD/MM/YYYY');
};

export default formatDate;

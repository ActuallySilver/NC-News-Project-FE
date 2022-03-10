const getTimePassedSince = (time) => {
  const currentTime = Date.now();
  const timePassed = currentTime - Date.parse(time);
  if (timePassed < 0) return "just now";
  const years = Math.floor(timePassed / 1000 / 60 / 60 / 24 / 365.25);
  if (years !== 0) {
    if (years === 1) return years + " year ago";
    return years + " years ago";
  }
  const days = Math.floor(timePassed / 1000 / 60 / 60 / 24);
  if (days !== 0) {
    if (days === 1) return days + " day ago";
    return days + " days ago";
  }
  const hours = Math.floor(timePassed / 1000 / 60 / 60);
  if (hours !== 0) {
    if (hours === 1) return hours + " hour ago";
    return hours + " hours ago";
  }
  const minutes = Math.floor(timePassed / 1000 / 60);
  if (minutes !== 0) {
    if (minutes === 1) return minutes + " minute ago";
    return minutes + " minutes ago";
  }
  return "just now";
};

export default getTimePassedSince;

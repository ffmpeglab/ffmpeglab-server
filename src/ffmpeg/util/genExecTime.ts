export const genExecTime = (dur: number) => {
  const duration = dur * 1000;
  let seconds: string | number = Math.floor((duration / 1000) % 60),
    minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
    hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);
  if (isNaN(seconds)) seconds = 0;
  if (isNaN(minutes)) minutes = 0;
  if (isNaN(hours)) hours = 0;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
};

export const execToMilliseconds = (timeString: string) => {
  const split = timeString.split(':');
  const hours = parseInt(split[0]) * 3600;
  const minutes = parseInt(split[1]) * 60;
  const seconds = parseFloat(split[2]);
  return hours + minutes + seconds;
};

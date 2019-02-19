const getRandomNumber = max => Math.floor(Math.random() * max);
const getNextRoundRobin = (total, current) => {
  let currentIndex = current;
  if (current >= total - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  return currentIndex;
};
export { getRandomNumber, getNextRoundRobin };

const createTarget = () => 100 + Math.floor(Math.random() * 900);

const shuffle = (array) => {
  const arrayToReturn = array.slice(0);
  for (let i = arrayToReturn.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arrayToReturn[i], arrayToReturn[j]] = [arrayToReturn[j], arrayToReturn[i]];
  }
  return arrayToReturn;
}

const pick = (selection, n) => {
  const randomSelection = shuffle(selection);
  return randomSelection.slice(0, n);
}

const pickLarge = (n) => pick([25, 50, 75, 100], n);

const pickSmall = (n) => pick([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10], n);

const pickNumbers = (nLarge) => pickLarge(nLarge).concat(pickSmall(6 - nLarge));

export { createTarget, pickNumbers };
export function shuffleArray<T>(array: T[]) {
  const resultArray = [...array];

  for (let i = resultArray.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = resultArray[i];
    resultArray[i] = resultArray[j];
    resultArray[j] = temp;
  }
  return resultArray;
}

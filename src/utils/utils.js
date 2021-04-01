export const myPromise = (condition, ...args) => {
  const promise = new Promise((resolve, reject) => {
    if (condition) {
      if (args !== []) {
        resolve(...args);
      } else {
        reject("Argruments cannot be empty");
      }
    } else {
      reject("Something when wrong!!!");
    }
  });

  return promise;
};

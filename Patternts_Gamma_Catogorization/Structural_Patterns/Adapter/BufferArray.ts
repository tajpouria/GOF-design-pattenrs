const concat = (...arrays: Array<number[]>) => {
  let totalLen = arrays.reduce((acc, val) => acc + val.length, 0);

  if (!totalLen) return null;

  let result = new Uint8Array(totalLen);

  arrays.forEach((array, idx) => {
    result.set(array, idx);
  });

  return result;
};

const ccd = concat([1, 2, 3, 4], [1, 2, 3]);

if (ccd) console.log(ccd[1]);

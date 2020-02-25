const range = {
  from: 0,
  to: 10,

  async *[Symbol.asyncIterator]() {
    for (let index = this.from; index < this.to; index++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield index;
    }
  },
};

(async () => {
  for await (let iterator of range) {
    console.log(iterator);
  }
})();

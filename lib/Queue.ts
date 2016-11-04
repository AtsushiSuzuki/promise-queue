export class Queue {
  private last: Promise<any> = Promise.resolve();

  enqueue(fn: () => Promise<any>) {
    const prev = this.last;
    return this.last = (async () => {
      try {
        await prev;
      } catch (err) {
      }

      return await fn();
    })();
  }
}

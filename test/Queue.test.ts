import * as assert from "assert";
import {Queue} from "../lib/Queue";


function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

describe("TaskQueue", () => {
  it("#enqueue should serialize each function execution", async () => {
    const arr: string[] = [];
    const target = new Queue();

    const p1 = target.enqueue(async () => {
      arr.push("b1");
      await delay(10);
      arr.push("e1");
    });
    const p2 = target.enqueue(async () => {
      arr.push("b2");
      await delay(10);
      arr.push("e2");
    });
    const p3 = target.enqueue(async () => {
      arr.push("b3");
      await delay(10);
      arr.push("e3");
    });

    await Promise.all([p1, p2, p3]);
    assert.deepEqual(arr, ["b1", "e1", "b2", "e2", "b3", "e3"]);
  });

  it("should work with error", async () => {
    const target = new Queue();

    target.enqueue(async () => {
      await delay(10);
      throw new Error("some error");
    });
    const p2 = target.enqueue(async () => {
    });

    await p2;
  });
});

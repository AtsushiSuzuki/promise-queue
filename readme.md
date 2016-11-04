promise-queue
=============

Task queue to serialize execution of promised functions.

# Usage

```sh
$ npm i --save @atsushi_suzuki/promise-queue
```

```typescript
import {Queue} from "@atsushi_suzuki/promise-queue";

function wait(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const queue = new Queue();
queue.enqueue(async function fn1() {
  console.log("begin fn1");
  await wait(10);
  console.log("end fn2");
});
queue.enqueue(async function fn2() {
  console.log("begin fn2");
  await wait(10);
  console.log("end fn2");
});

// result:
//   begin fn1
//   end fn1
//   begin fn2
//   end fn2
```

# API
## Queue#enqueue(fn: () => Promise<any>): Promise<any>

Register an function to job queue.

Returns promise which will be resolved when provided function's return value is resolved.

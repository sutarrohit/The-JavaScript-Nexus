# 📘 Appendix A – The asynquence Library

### 🔹 1. Overview

-   **asynquence** is a small JavaScript library created by _Kyle Simpson_ (the book’s author).
-   Purpose:

    -   Simplify working with **asynchronous sequences**.
    -   Provide a chainable API (similar to Promises) but with more flexible patterns.

-   It’s like **Promises + async control flow helpers**, but lighter and easier to reason about.

---

### 🔹 2. Core Concept

-   Think of it as a **sequence (flow) of steps**.
-   Each step passes results to the next, just like a pipeline.
-   Handles both:

    -   **Synchronous values**
    -   **Asynchronous tasks**

Example:

```js
ASQ(function (done) {
    setTimeout(function () {
        done("Hello");
    }, 1000);
})
    .then(function (done, msg) {
        console.log(msg); // "Hello"
        done("World");
    })
    .val(function (msg) {
        console.log(msg); // "World"
    });
```

---

### 🔹 3. Key Methods

#### **`ASQ(..)`**

-   Starts a new sequence.
-   Accepts an optional function to kick off async work.

#### **`.then(..)`**

-   Similar to Promises’ `.then()`.
-   Accepts a step function with `(done, ...args)`.
-   Must call `done(..)` to move to the next step.

#### **`.val(..)`**

-   Like `.then()`, but simpler for just handling values.
-   Automatically passes values to next step (no need for `done()`).

#### **`.seq(..)`**

-   Sequential execution.
-   Chains functions that run **one after another**.

#### **`.gate(..)`**

-   Parallel execution.
-   Runs multiple async tasks in parallel, waits for all to finish.
-   Like `Promise.all`.

```js
ASQ()
    .gate(
        function (done) {
            setTimeout(() => done("A"), 100);
        },
        function (done) {
            setTimeout(() => done("B"), 50);
        }
    )
    .val(function (a, b) {
        console.log(a, b); // "A", "B"
    });
```

#### **`.or(..)`**

-   Error handling (like `.catch()` in Promises).
-   Called if any step fails.

#### **`.pipe(..)`**

-   Passes results into another sequence.
-   Useful for **composing sequences**.

#### **`.fork(..)`**

-   Splits a sequence into multiple independent paths.

---

### 🔹 4. Advanced Features

-   **Concurrency control**:

    -   `.race(..)` → like `Promise.race`.
    -   `.gate(..)` → parallel tasks.

-   **Iterables**:

    -   `.map(..)` and `.reduce(..)` available for async flows.

-   **Cancellation**:

    -   Sequences can be aborted mid-way.

-   **Plugins**:

    -   asynquence supports extension through plugins for extra patterns.

---

### 🔹 5. Comparison with Promises

-   **Similarities**:

    -   Chainable API.
    -   Handles async values.
    -   Error propagation with `.or(..)`.

-   **Differences**:

    -   More built-in flow helpers (`gate`, `seq`, `fork`).
    -   Less boilerplate (no `new Promise` constructor ceremony).
    -   Easier to manage multiple async tasks.

---

### 🔹 6. Example: Parallel + Sequential

```js
ASQ()
    .seq(function (done) {
        setTimeout(() => done(10), 200);
    })
    .gate(
        function (done, num) {
            done(num * 2);
        },
        function (done, num) {
            done(num + 5);
        }
    )
    .val(function (x, y) {
        console.log(x, y); // 20, 15
    });
```

-   First step: produces `10`.
-   Parallel step: doubles it (`20`) and adds 5 (`15`).
-   Final step: logs both results.

---

### 🔹 7. Why Use asynquence?

-   Cleaner syntax than nested callbacks.
-   Provides **structured async patterns** not covered by raw Promises.
-   Lightweight and flexible.
-   Especially useful before async/await became standard (and still good for flow control in some cases).

---

### 🔹 8. Key Takeaways

-   **asynquence** = Async + Sequence (chained tasks).
-   Supports both **sequential** and **parallel** flows.
-   Built-in helpers like `.then`, `.val`, `.seq`, `.gate`, `.or`, `.pipe`.
-   Great for **composing complex async logic** cleanly.
-   Can serve as an alternative or complement to **Promises** and **async/await**.

---

---

# Appendix B – Advanced Async Patterns

### 🔹 1. Why Advanced Patterns?

-   Async programming often requires **coordination** of multiple tasks.
-   Beyond simple Promises or callbacks, real-world apps need:

    -   Parallel execution
    -   Sequencing
    -   Error handling
    -   Cancellation
    -   Iteration over async tasks

---

### 🔹 2. Sequence Pattern

-   **Run tasks one after another**.
-   Each task waits for the previous one to complete.
-   Useful for dependent tasks.

Example with Promises:

```js
task1().then(task2).then(task3).catch(handleError);
```

---

### 🔹 3. Gate (Parallel) Pattern

-   Run multiple async tasks **in parallel**.
-   Wait until all complete.
-   Similar to `Promise.all`.

```js
Promise.all([task1(), task2(), task3()]).then(([r1, r2, r3]) => {
    console.log(r1, r2, r3);
});
```

---

### 🔹 4. Race Pattern

-   Compete tasks in parallel.
-   The **first one to finish** wins; others are ignored.
-   Similar to `Promise.race`.

```js
Promise.race([task1(), task2()]).then((result) => console.log(result));
```

---

### 🔹 5. Iteration Pattern

-   Run async tasks over a collection (like `map`, `reduce`).
-   Can execute:

    -   Sequentially (`reduce`)
    -   In parallel (`map + Promise.all`)

Example sequential reduce:

```js
tasks.reduce((p, task) => {
    return p.then(task);
}, Promise.resolve());
```

---

### 🔹 6. Cancellation

-   Stopping async tasks mid-way.
-   Not natively supported in Promises.
-   Workarounds:

    -   Use a flag to abort future tasks.
    -   Use **AbortController** (modern JS) for fetch requests.

```js
const controller = new AbortController();
fetch("/data", { signal: controller.signal });
controller.abort(); // cancels request
```

---

### 🔹 7. Concurrency Control

-   Limit how many tasks run at the same time.
-   Useful for API calls, file processing, etc.
-   Example: run max 3 tasks at once.

```js
async function runLimited(tasks, limit = 3) {
    const results = [];
    while (tasks.length) {
        const chunk = tasks.splice(0, limit).map((t) => t());
        results.push(...(await Promise.all(chunk)));
    }
    return results;
}
```

---

### 🔹 8. Reactive Pattern

-   Event-driven async flow.
-   Respond to continuous streams of values.
-   Basis for **RxJS** and **Observables**.

Example:

```js
const clicks = fromEvent(document, "click");
clicks.subscribe((evt) => console.log(evt));
```

---

### 🔹 9. Actor Model

-   Tasks are modeled as independent **actors**.
-   Each actor has:

    -   A mailbox (queue of messages).
    -   State managed internally.

-   Communicate only via messages, not shared state.
-   Helps avoid race conditions.

---

### 🔹 10. CSP (Communicating Sequential Processes)

-   Async flow modeled with **channels**.
-   Tasks send/receive messages via channels.
-   Avoids callback spaghetti by making async **message-driven**.
-   Libraries like **js-csp** implement this in JS.

Example:

```js
var ch = csp.chan();

csp.go(function* () {
    yield csp.put(ch, 42);
});

csp.go(function* () {
    var val = yield csp.take(ch);
    console.log(val); // 42
});
```

---

### 🔹 11. Key Takeaways

-   **Sequence**: step-by-step tasks.
-   **Gate/Parallel**: run all together, wait for completion.
-   **Race**: fastest result wins.
-   **Iteration**: async loops with `map`/`reduce`.
-   **Cancellation**: stop async work (AbortController, flags).
-   **Concurrency Control**: limit how many tasks run simultaneously.
-   **Reactive Streams**: continuous event-driven async handling.
-   **Actor Model & CSP**: advanced message-passing async coordination.

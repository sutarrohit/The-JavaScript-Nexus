# 1. What is a Fragment?

A **Fragment** lets you group multiple React children without adding an extra DOM node.
It’s useful when JSX requires a single parent but you don’t want to render an extra `<div>` or other wrapper.

Two forms:

-   Full form: `React.Fragment` or imported `Fragment`
-   Shorthand: `<>...</>`

```jsx
// full form
import React, { Fragment } from "react";

return (
    <Fragment>
        <ChildA />
        <ChildB />
    </Fragment>
);

// shorthand
return (
    <>
        <ChildA />
        <ChildB />
    </>
);
```

---

## When to use a Fragment

-   Returning multiple elements from a component (no extra DOM node).
-   Rendering lists where an extra wrapper would break layout or semantics (e.g., tables, flex/grid).
-   Grouping siblings when mapping over arrays.
-   Avoiding extra CSS/layout changes caused by wrappers.

Examples:

```jsx
// mapping rows for a table body
<tbody>
    {rows.map((row) => (
        <Fragment key={row.id}>
            <tr>...</tr>
            <tr>...</tr>
        </Fragment>
    ))}
</tbody>;

// returning multiple top-level nodes from a component
function Card() {
    return (
        <>
            <header>Title</header>
            <section>Body</section>
            <footer>Footer</footer>
        </>
    );
}
```

---

## Shorthand vs Full form

-   `<>...</>` is shorter and most common.
-   **Shorthand has no props** — you **cannot** add `key`, `className`, etc., to it.
-   If you need props (most commonly `key` when returning a list of fragments), use the full form:

```jsx
// WRONG: shorthand can't accept key
// rows.map(row => ( <>... </> )) // can't set key here

// CORRECT: use Fragment with key
rows.map((row) => (
    <Fragment key={row.id}>
        <td>...</td>
        <td>...</td>
    </Fragment>
));
```

---

## Important details & gotchas

-   **No DOM output**: Fragments do not create extra DOM elements — they disappear in the rendered HTML.
-   **Accessibility**: Because they don't add nodes, they won't affect ARIA semantics — usually desirable.
-   **Attributes / props**: Only the full `Fragment` accepts props (but the only meaningful prop is `key`). You cannot pass `className`, `style`, `aria-*`, etc., to `Fragment`.
-   **Text nodes**: You can place text directly inside a Fragment.
-   **Fragments & keys**: Use `key` on the Fragment when returning multiple sibling elements from a map to satisfy React’s reconciliation.
-   **Performance**: Fragments are lightweight; they avoid unnecessary wrapper elements and the associated CSS/layout cost.
-   **Fragments inside components**: Common inside lists, conditional returns, and higher-order components that must return a single element.

---

## Examples — concrete patterns

1. **Simple return**

```jsx
function Greeting() {
    return (
        <>
            <h1>Hello</h1>
            <p>Welcome back!</p>
        </>
    );
}
```

2. **List with Fragment keys**

```jsx
function NamePairs({ pairs }) {
    return (
        <ul>
            {pairs.map((p) => (
                <Fragment key={p.id}>
                    <li>{p.first}</li>
                    <li>{p.last}</li>
                </Fragment>
            ))}
        </ul>
    );
}
```

3. **Conditional grouping**

```jsx
return (
    <>
        {isLoggedIn ? <UserMenu /> : <AuthButtons />}
        <Notifications />
    </>
);
```

4. **Table rows (avoid invalid DOM)**

```jsx
<table>
    <tbody>
        {data.map((row) => (
            <Fragment key={row.id}>
                <tr>
                    <td>{row.a}</td>
                </tr>
                <tr>
                    <td>{row.b}</td>
                </tr>
            </Fragment>
        ))}
    </tbody>
</table>
```

---

## When not to use Fragment

-   When you need to attach attributes (`className`, `id`, `style`, ARIA) to a wrapper — then use a real DOM element.
-   If you actually want an element for styling or layout reasons (e.g., apply flex container styles).

## TL;DR

-   Use `<>...</>` to return multiple JSX nodes without adding DOM elements.
-   Use `React.Fragment` (or `Fragment`) when you need to set a `key`.
-   Fragments keep the DOM clean and avoid layout/semantic issues caused by unnecessary wrappers.

---

---

# 2. React `<StrictMode>`

-   A **wrapper component** in React that enables **extra checks and warnings** during development.
-   It does **not affect production builds** — only runs in development.
-   Helps you **find potential problems early**.

```jsx
import React from "react";

function App() {
    return (
        <React.StrictMode>
            <MyComponent />
        </React.StrictMode>
    );
}
```

---

## What does `<StrictMode>` do?

1. **Identifies unsafe lifecycle methods**
   Warns if you use old lifecycle methods (`componentWillMount`, `componentWillReceiveProps`, etc.).

2. **Warns about deprecated APIs**
   Helps prepare your code for future React versions.

3. **Double-invokes certain functions in development**

    - `useEffect` setup/cleanup functions
    - Component constructor & render
    - This is intentional! It simulates mounting/unmounting twice to help catch **side-effects**.

4. **Checks legacy string refs**
   Warns if you use string refs instead of `useRef` or callback refs.

5. **Detects unexpected side effects**
   Encourages writing **pure and predictable components**.

---

## Key Points

-   ✅ **Development only** — ignored in production.
-   ✅ Can wrap part of the component tree, not just the root.
-   ✅ Multiple `<StrictMode>` blocks can exist in one app.
-   ❌ Does not render anything to the DOM.
-   ❌ Does not catch runtime errors (use error boundaries for that).

---

## Example — Wrapping Entire App

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

---

## Example — Wrapping Part of Tree

```jsx
function MainApp() {
    return (
        <>
            <Header />
            <React.StrictMode>
                <ExperimentalFeature />
            </React.StrictMode>
            <Footer />
        </>
    );
}
```

---

## Why use `<StrictMode>`?

-   Encourages **best practices**.
-   Prepares your code for **future React updates**.
-   Helps detect **side-effects** in render and effects.
-   Makes your app more **predictable and maintainable**.

## When not to use `<StrictMode>`?

-   In production — unnecessary (React ignores it).
-   If warnings confuse new learners — you can temporarily remove it, but it’s strongly recommended to keep it.

✅ **TL;DR**:
`<StrictMode>` is like React’s "lint mode" for components.
It runs **extra checks, warnings, and double-invocations** during development to help you write safer and future-proof React code.

---

---

# React `<Profiler>`

-   A **built-in React component** used to **measure rendering performance** of parts of the React tree.
-   It helps you find **slow components** or unnecessary re-renders.
-   Like a stopwatch for components — it tells you how long rendering took and why it re-rendered.
-   Useful for **performance tuning and debugging**.

## Syntax

```jsx
<Profiler id='some-unique-id' onRender={callback}>
    <ComponentTree />
</Profiler>
```

-   **`id` (string)**: A label to identify which part of the UI is being measured.
-   **`onRender` (function)**: Callback function called every time the wrapped components **commit an update**.

## When does `onRender` fire?

-   **Initial mount** (first render).
-   **Re-renders** (when props, state, or context change).

---

## Parameters of `onRender` callback

The callback receives **7 arguments**:

```ts
function onRenderCallback(
    id, // string - the "id" prop of the Profiler
    phase, // "mount" | "update" - was it first render or an update?
    actualDuration, // number - time spent rendering this update
    baseDuration, // number - estimated time to render the subtree without memoization
    startTime, // number - when React started rendering
    commitTime, // number - when React committed changes
    interactions // Set - interactions that triggered this update
) {}
```

### Meaning of each:

1. **id** – identifies which `<Profiler>` wrapped this render.
2. **phase** – `"mount"` (initial render) or `"update"`.
3. **actualDuration** – time React spent rendering the components inside.
4. **baseDuration** – time it would take if no memoization was used (worst case).
5. **startTime** – when React started rendering this update.
6. **commitTime** – when React committed the update to the DOM.
7. **interactions** – Set of interactions (from React concurrent mode / scheduler).

---

## Example — Profiling a Component

```jsx
import React, { Profiler } from "react";

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
}

function App() {
    return (
        <Profiler id='AppProfiler' onRender={onRenderCallback}>
            <Dashboard />
        </Profiler>
    );
}
```

👉 Every time `Dashboard` or its children re-render, React logs performance stats.

---

## Real-World Use Cases

1. **Detecting slow renders**
   Identify components taking too long to render.

2. **Measuring re-renders**
   See how often a component re-renders and why.

3. **Comparing optimizations**
   Wrap with Profiler before and after using `React.memo` / `useMemo` / `useCallback` to measure improvements.

4. **Profiling specific subtrees**
   You can wrap **only part of the tree** to narrow down performance bottlenecks.

```jsx
<Profiler id='Chart' onRender={onRenderCallback}>
    <Chart data={bigData} />
</Profiler>
```

## Important Details & Gotchas

-   ✅ **Does not affect production performance** (only runs profiling code in development).
-   ✅ You can have **multiple Profilers** in your tree, each with its own `id`.
-   ✅ Works with React DevTools Profiler tab (GUI view).
-   ❌ Not meant for error handling (use `<ErrorBoundary>` for that).
-   ❌ Profiling too many components at once may make logs overwhelming.

---

---

# 3. React `<Suspense>`

-   A **React component** for handling **asynchronous rendering**.
-   Lets you **show a fallback UI** (like a spinner or loading message) while waiting for:

    -   Lazy-loaded components (`React.lazy`)
    -   Data fetching (with concurrent features / React Server Components)
    -   Other asynchronous tasks (e.g., Suspense-enabled libraries).

Think of it as a **loading boundary**:

> Until the child is ready, show `fallback`.

## Syntax

```jsx
<Suspense fallback={<Loading />}>
    <SomeAsyncComponent />
</Suspense>
```

-   **`fallback` (required prop)**: UI shown while children are "suspending" (waiting).
-   **Children**: Any component that may suspend.

---

## Core Uses of `<Suspense>`

### 1. Code Splitting with `React.lazy`

```jsx
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}
```

✅ Shows `Loading...` until `LazyComponent` is loaded.

---

### 2. Data Fetching (React 18+)

Suspense can handle async data in **React 18 concurrent mode** with libraries like Relay, Next.js App Router, or React’s experimental `use()` hook.

```jsx
<Suspense fallback={<p>Fetching data...</p>}>
    <UserProfile />
</Suspense>
```

If `UserProfile` suspends while fetching, fallback UI is shown.

---

### 3. Nested Suspense Boundaries

You can have **multiple Suspense boundaries** to show different fallback UIs for different parts of the app.

```jsx
<Suspense fallback={<Spinner />}>
    <Header />
    <Suspense fallback={<div>Loading feed...</div>}>
        <Feed />
    </Suspense>
    <Footer />
</Suspense>
```

👉 Here, if `Feed` is slow, only the feed shows "Loading..." while header/footer render immediately.

---

## Key Features

1. **Graceful Loading States**
   Avoids "blank screen" while waiting for async code/data.

2. **Granular Control**
   Wrap small parts of the tree (e.g., only a sidebar, not the whole page).

3. **Concurrent Rendering** (React 18+)
   Works with concurrent features like `startTransition` and streaming server rendering.

4. **Fallback UI**
   Accepts any JSX element (spinner, skeleton, text).

---

## Example with Multiple Async Components

```jsx
<Suspense fallback={<div>Loading app...</div>}>
    <Sidebar />
    <Suspense fallback={<div>Loading main content...</div>}>
        <MainContent />
    </Suspense>
</Suspense>
```

-   App fallback → shown if **everything suspends**.
-   Inner fallback → shown only if `MainContent` is still loading.

---

## Things `<Suspense>` Doesn’t Do

-   ❌ Doesn’t fetch data by itself (you need libraries or `React.lazy`).
-   ❌ Doesn’t replace **error handling** (use `<ErrorBoundary>` for errors).
-   ❌ Doesn’t work with arbitrary promises — only with **Suspense-enabled resources**.

---

## Real-World Use Cases

-   **Lazy loading routes** in React Router with `Suspense`.
-   **Code splitting** for big components.
-   **Progressive rendering** (render shell UI immediately, load data-heavy parts later).
-   **Streaming server rendering** in React 18 (used by Next.js App Router).

---

## Example — Lazy Routes (React Router v6+)

```jsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading route...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

---

## Best Practices

-   Use **nested Suspense boundaries** for smoother UX.
-   Show **skeletons** instead of just "Loading…" for better user perception.
-   Pair `<Suspense>` with `<ErrorBoundary>` to handle both **loading** and **error** states.

## TL;DR

-   `<Suspense>` = **loading boundary** in React.
-   Shows `fallback` until children are ready.
-   Works with **`React.lazy`** (code splitting) and **data fetching** in React 18.
-   Can nest multiple Suspense boundaries for fine-grained loading UI.
-   Pair with **Error Boundaries** for complete resilience.

---

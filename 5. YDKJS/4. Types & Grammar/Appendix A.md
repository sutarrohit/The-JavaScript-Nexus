# 1. Annex B (ECMAScript Deviations for Browsers)

-   JavaScript is ECMAScript, but browsers added deviations for legacy reasons.
-   Examples:

    -   **Octal literals** allowed in non-strict mode (`0123 → 83`).
    -   `window.escape(..)` / `window.unescape(..)` for old %-hex string escaping.
    -   `String.prototype.substr(..)` → behaves differently from `substring(..)` (second argument = length, not end index).

-   These only matter if your code runs in **non-browser environments** (like Node.js).

---

# 2. Web ECMAScript (Browser-Only Features)

Some browser-specific deviations not in Annex B but widely supported:

-   **HTML-style comments** (`<!--` and `-->`) are valid JS single-line comments.
-   `String.prototype` HTML helpers (like `.bold()`, `.fontcolor()`, `.link()`) → now discouraged.
-   RegExp extras: `RegExp.$1 .. $9`, `RegExp.lastMatch`.
-   `Function.prototype.arguments` and `Function.caller` (deprecated — don’t use).

**Lesson:** These are browser-only quirks. Don’t rely on them if you want portability.

---

# 3. Host Objects

-   Host objects = objects provided by the environment, not the JS engine.
    Examples: `console`, DOM nodes (`document.createElement(..)`).
-   Quirks of host objects:

    -   May not inherit standard object methods (`toString()`).
    -   May have non-overwritable or read-only props.
    -   Some methods cannot have `this` rebound.

-   Example:

    -   In browsers → `console.log` connects to DevTools console.
    -   In Node.js → connects to `stdout` / `stderr`.

**Lesson:** Don’t assume host objects behave like normal JS objects.

---

# 4. Global DOM Variables

-   Declaring global variables makes them properties on `window`.
-   But: DOM elements with `id` also create **implicit global variables**.

```html
<div id="foo"></div>
<script>
    console.log(foo); // Refers to DOM element, not a variable
</script>
```

**Lesson:** Avoid global vars. Use unique names or scoped variables to prevent collisions.

---

# 5. Native Prototypes (Don’t Extend!)

-   Best practice: **never extend native prototypes** (`Array.prototype`, `Object.prototype`, etc.).
-   Example from book:

    ```js
    // Old hack for Netscape 4
    Array.prototype.push = function (item) {
        this[this.length - 1] = item;
    };
    ```

    This broke jQuery because the spec later defined `push(..)` to accept multiple items.

-   Extending natives creates **landmines** — may conflict with future specs or other libraries.

**Lesson:** Don’t extend natives unless you control the entire environment.

---

# 6. Shims / Polyfills

-   **Polyfill** = add missing spec features safely.
-   **Shim** = sometimes tested for compliance before adding.
-   Safe example:

    ```js
    if (!Array.prototype.includes) {
      Array.prototype.includes = function(value) { ... };
    }
    ```

-   Tools: **ES5-Shim**, **ES6-Shim**, transpilers like **Traceur/Babel**.
-   Risks:

    -   Partial polyfills may be misleading.
    -   Feature tests are safer but impractical for every method.

---

# 7. `<script>` Elements

-   Multiple `<script>` tags act as **separate programs** but share the same global object.
-   Example:

    ```html
    <script>
        foo();
    </script>
    <!-- Error, foo not defined yet -->
    <script>
        function foo() { ... }
    </script>
    ```

    But reversing them works.

-   Errors in one `<script>` don’t stop others from running.
-   Inline `<script>` quirks:

    -   `</script>` inside a string breaks parsing.
    -   Old practice of wrapping scripts in `<!-- ... //-->` → no longer needed.

---

# 8. Reserved Words

-   Certain keywords (`function`, `switch`) and future reserved words (`enum`, `class`, etc.) cannot be used as identifiers.
-   Older restrictions:

    -   Couldn’t even use reserved words as object property keys in ES3.
    -   ES5 lifted this restriction.

---

# 9. Implementation Limits

Different engines impose different **practical limits**, e.g.:

-   Max function arguments.
-   Max string literal length.
-   Max recursion depth (call stack).
-   Execution time before browser forces termination.

Rare but worth remembering for large-scale or performance-heavy apps.

---

# Summary

Appendix A teaches that **JavaScript doesn’t run in isolation**:

-   Engines + hosts = unpredictable differences.
-   Risks: host quirks, DOM globals, extending natives, environment-specific deviations.
-   Safeguards:

    -   Avoid globals.
    -   Don’t extend prototypes.
    -   Use feature tests + polyfills.
    -   Always consider that JS runs in a _mixed environment_.

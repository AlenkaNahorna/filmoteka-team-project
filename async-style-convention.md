# Async Style Consistency

Flags places where asynchronous code mixes `.then()`/`.catch()` chains with `async`/`await` inside the same codebase, module, or function — pick one style and hold it consistently. Cite the exact `file:line` for every finding.

## Why this matters

Mixing the two styles in one project makes error handling inconsistent (a `.then()` chain silently swallows a rejection differently than a `try/catch` around `await`), makes call sites harder to scan (readers have to context-switch styles function by function), and is a common sign that code was copy-pasted between modules instead of factored into a shared helper.

## What to flag

- A function that awaits one async call with `await` and handles another with `.then()`/`.catch()` in the same body.
- A module where sibling functions doing the same kind of work (e.g. two near-identical data-fetch-and-render helpers) use different async styles from each other.
- A `.then()` chain with no matching `.catch()` — if a Promise-chain style is kept anywhere, every chain still needs its own `.catch()` or must flow into a caller that handles rejection.
- A codebase-wide async style already established (check the majority pattern across the module/directory first) with a new or edited function going against it.

## Example (found in filmoteka-team-project)

- `src/api/getDataFilms.js`, `src/js/render/renderByKey.js`, `src/js/render/renderPopularMovies.js` use `async`/`await` throughout.
- `src/js/localStorage/queue.js` and `src/js/localStorage/watched.js` call the same `getDataFilms(id)` but consume it with `.then(result => { ... })` instead — the odd ones out against the rest of the codebase.
- Not a coincidence: both files also duplicate a near-identical `dataCombine()` helper and the same list-rendering loop, which is a signal they were copied from one file into the other rather than factored into a shared function — worth flagging together with the style mismatch.

## Reporting

For every finding: cite `file:line`, quote the mismatched pattern, name what the dominant style in that codebase/module already is (with a supporting `file:line` example of it), and suggest converting to match rather than just noting the inconsistency. Skip a lone file that has no sibling to be inconsistent with — this skill is about mismatches within a codebase, not a preference for one style over the other in isolation.

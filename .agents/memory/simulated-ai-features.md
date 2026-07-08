---
name: Simulated vs real AI features
description: How to properly remove a real AI/LLM integration and replace it with a simple client-side simulation
---

When a user asks to remove a real AI integration and replace it with "a simulated AI" (e.g. after an API key had no quota, or they just want something lightweight):

- Remove the feature end-to-end, not just the UI: OpenAPI paths/schemas, backend route, dependency (e.g. `openai` package), and re-run codegen so generated hooks/zod schemas are gone too. Leaving a generated hook (e.g. `useAiSearch`) around while deleting its usage is fine, but leaving the *usage* while removing the generated export causes a runtime `ReferenceError`/broken hot-reload.
- A good simple simulation pattern: a small keyword→canned-answer knowledge base (array of `{match: string[], answer: string}`), matched via `question.toLowerCase().includes(keyword)`, with a fallback answer, plus an artificial `setTimeout` delay (e.g. 600-1100ms randomized) and a loading state to mimic "thinking" — no network/backend call needed at all.
- After the swap, always grep the changed component for the old hook/mutation name to confirm no stale references remain, since TS may still typecheck stale hot-reloaded state in the browser even after the source is fixed (restart workflow + fresh screenshot to confirm clean console).

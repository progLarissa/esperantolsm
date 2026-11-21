# esperantolsm

**Kajero de Esperanto**: a self-study notebook that takes a Brazilian learner (Portuguese and Spanish speaker) from A1 to B2 in Esperanto. The whole notebook is one HTML page, focused on reading and writing (there is no audio).

## What's inside

- **12 units** (A1 → B2), each with a lesson in Portuguese, a reading text with glosses, exercises, a guided writing task and its own chapter of the novella.
- **La libro kun la verda stelo**: a 12-chapter novella written only with the grammar each unit has already covered.
- **Radikoj**: 1,235 roots ordered by usefulness, with their common derivatives and spaced repetition.
- **Legoĉambro**: dialogues, texts to answer in writing, numbers written out in full, and new AI-generated texts.
- **Tools**: verbs, correlatives (tabelvortoj), word building, false friends, sentence lab, mistakes notebook.
- **Tests and KER-style exams**, plus a dated study plan.

## How to use it

Open `index.html` in a browser. Progress is saved in the browser's `localStorage`.

AI correction, writing-based conversation and text generation only work when the page is opened as an artifact inside Claude, because they use `window.claude`. Everything else works in any browser.

## How to rebuild it

`index.html` is generated from the files in `src/`:

```bash
python3 src/assemble.py   # writes index.html at the repository root
```

| File | Contents |
|---|---|
| `src/eo_u1.js` … `eo_u3.js` | units 1–12 |
| `src/eo_t1.js` … `eo_t3.js` | false friends, verbs, affixes, tests, vocabulary, culture, dialogues, texts, exams |
| `src/eo_story.js` | the novella |
| `src/eo_rad.js` | the root list |
| `src/eo_engine_*.js`, `eo_rad_engine.js`, `eo_gen_engine.js` | the page engine |
| `src/patch_noaudio.py` | text-only adaptation and the new pages (applied by `assemble.py`) |
| `src/*.css`, `eo_head.html`, `skel.html` | layout |

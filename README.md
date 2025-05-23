# Langton’s Ant Simulator — *Project Vibes*

> *“From simple rules, unexpected highways emerge.”* — Observation after Langton, 1986

[![Deploy](https://github.com/CuteLoop/Vibes/actions/workflows/deploy.yml/badge.svg)](https://github.com/CuteLoop/Vibes/actions/workflows/deploy.yml)
\:rocket: **Live demo:** [https://cuteloop.github.io/Vibes/](https://cuteloop.github.io/Vibes/)

---

## 1 · Why should mathematicians care?

Langton’s Ant is a minimalist **two–state, two–colour cellular automaton** on $\mathbb Z^2$.  Despite the trivial local rule


\textbf{if}\;\square_{i,j}=\text{white}\;\Rightarrow\;\text{turn Right};\quad
\textbf{else}\;\text{turn Left},\tag{1}\]
the global trajectory exhibits three distinct regimes—chaos, symmetry, and the famous **periodic highway** that grows linearly after about \(10^4\) steps.  The simulator lets you witness this phase transition in real time, zoom‑panning through a lattice of up to a million visited cells at 60 fps.

*Mathematical digression.*  A long‑standing open problem asks whether every finite configuration eventually builds a highway. Numerical evidence here suggests the ant’s displacement after \(n\) steps obeys an empirical law \(\Theta(n)\) once the corridor stabilises, but a proof remains elusive.

---

## 2 · Quick start
```bash
# clone and run locally
git clone https://github.com/CuteLoop/Vibes.git
cd Vibes
npx serve . -l 8000     # or: python -m http.server 8000
#→ http://localhost:8000
```
Controls: **Play / Pause** (or `Space`), **Reset** (`R`), speed slider, cell‑size input, mouse wheel = zoom, drag = pan, **Download PNG** for snapshots.

---

## 3 · Implementation highlights
| Component | Idea | Complexity |
|-----------|------|-----------|
| Sparse grid | Set keyed by \(x\cdot 2^{32}+y\) integer hash → \(O(1)\) toggle | \(\Theta(k)\) memory for \(k\) black cells |
| Rendering  | Off‑screen `p5.Graphics` cache for static trail; redraw only flipped cells each frame | Sustains \(10^4\) steps ∙ 60 fps |
| Autodeploy | GitHub Actions ⇒ artifact ⇒ `gh-pages` | 30 s CI round‑trip |

---

## 4 · Continuous deployment
The workflow **`.github/workflows/deploy.yml`** uploads the repository (minus CI files) as a Pages artifact and publishes to the `gh-pages` branch.  Enable *Settings → Pages → Source → GitHub Actions* once, and every push to `main` is live within a minute.

---

## 5 · *How this code was vibe‑coded*
This project was developed in **Cursor** with an *agentic coding* workflow:
1. A structured prompt (see `docs/prompt.md`) described deliverables, performance targets, and GitHub Pages automation.
2. Cursor’s inline ChatGPT completions generated boilerplate; I iterated, running `npx serve .` after each change.
3. Large refactors (sparse‑grid hashing, UI modularisation) were driven by conversation with ChatGPT (o3 model), followed by manual optimisation.
4. README and documentation were composed with the same conversational approach — you’re reading the result.

> **Disclaimer.** Portions of the codebase and this document were generated with OpenAI ChatGPT.  All outputs were reviewed and adjusted for correctness, style, and performance before commit.  Any mathematical errors remain the author’s.

---

## 6 · License
This project is released under the **MIT License** — see `LICENSE` for full text.

Happy ant‑watching & may your highways be ever straight!



# Langton’s Ant Simulator — *Project Vibes*

> *“From simple rules, unexpected highways emerge.”* — Observation after Langton (1986)

[![Deploy](https://github.com/CuteLoop/Vibes/actions/workflows/deploy.yml/badge.svg)](https://github.com/CuteLoop/Vibes/actions/workflows/deploy.yml)

\:rocket: **Live demo:** [https://cuteloop.github.io/Vibes/](https://cuteloop.github.io/Vibes/)

---

## 1 · Mathematical teaser

For each lattice point \$\bigl(x,y\bigr)\in\mathbb Z^{2}\$ we store a **color** \$c\in S={\text{white},\text{black}}\$.
The **ant** has a position \$(x,y)\$ and an **orientation** \$d\in O={!
\uparrow,\rightarrow,\downarrow,\leftarrow}\$.

The local update rule is a function

$$
  f:S\times O\;\longrightarrow\;S\times O,\qquad
  f(c,d)=\bigl(\overline c,\;R_{c}(d)\bigr),
$$

where \$\overline c\$ flips the colour and \$R\_{c}\$ rotates the heading \$+\tfrac{\pi}{2}\$ if \$c=\text{white}\$ and \$-\tfrac{\pi}{2}\$ if \$c=\text{black}\$.
Despite this two–line definition the trajectory exhibits a *transient chaos* followed (after ≈,10 000 steps) by a periodic **highway** of period 104.

Mathematicians see it as a playground for *emergence*, *computability* (it’s Turing complete!), and *probabilistic tilings*.

---

## 2 · Project highlights

* **Pure client‑side** HTML + ES‑modules; no bundler.
* Rendering via `p5.js` on an auto‑scaling canvas (zoom & pan).
* Sparse grid stored as a `Set<number>` → linear memory in visited cells.
* 60 fps at 10 k steps/frame on a mid‑2020 laptop in Chrome.
* One‑click **GitHub Pages** deployment (workflow in `.github/workflows/deploy.yml`).

---

## 3 · Quick start (local)

```bash
python -m http.server 8000   # OR  npx serve . -l 8000
```

Open [http://localhost:8000](http://localhost:8000) and press **Play**.
Need auto‑reload? → Install the *Live Server* VS‑Code extension.

---

## 4 · Repo structure

```
Vibes/
 ├─ index.html        # markup
 ├─ style.css         # flex layout + responsive canvas
 ├─ src/
 │   ├─ grid.js       # sparse Set, color flips
 │   ├─ ant.js        # position + heading logic
 │   ├─ ui.js         # controls wiring (Play/Pause, etc.)
 │   └─ main.js       # p5 sketch + draw loop
 └─ .github/workflows/deploy.yml  # auto‑publish to gh‑pages
```

---

## 5 · Continuous deployment

1. **Push** to `main` → GitHub Action packages the site, creates/updates `gh-pages`.
2. **Settings → Pages → Source:** “GitHub Actions”.  *(One‑time toggle.)*
3. Site is instantly live at `https://CuteLoop.github.io/Vibes/`.

---

## 6 · Vibe‑coding with Cursor + ChatGPT

This repository was scaffolded in one sitting using **Cursor**’s agentic code‑generation (“Vibe Coding” mode) powered by **OpenAI ChatGPT (o3)**.  Prompts described the desired architecture, performance targets, and deployment pipeline; the assistant produced modular code, tests, and the CI file.  Manual edits were limited to tweaking CSS and tightening the math exposition you’re reading now.

> *Disclaimer.*  While LLMs accelerate boiler‑plate production, always review logic and security by hand—particularly for projects that do more than colour squares!

---

## 7 · Exercises for the reader

1. Prove that the ant visits every square infinitely often **or** eventually enters a highway.  *(Hint: consider parity arguments and bounding boxes—then realise you’ll need the 2004 result by Gajardo et al.)*
2. Modify `grid.js` to support \$k\$‑colour ants (Turmites). What new periodicities appear?
3. Show that Langton’s Ant can simulate a 1‑tape Turing machine. Embed the construction in JavaScript and measure step complexity.

*Happy ant‑herding!*

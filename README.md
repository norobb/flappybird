# Flappy Duck

Flappy-Bird-Klon für [MakeCode Arcade](https://arcade.makecode.com/): Gustav Gans weicht Rohren aus.

**Spielen:** https://norobb.github.io/flappybird/

## Steuerung

- `A` oder `↑`: flattern
- Rohren ausweichen, jedes passierte Rohrpaar gibt einen Punkt. Boden, Decke oder Rohr beenden das Spiel; der Highscore wird von MakeCode gespeichert.

## Entwickeln

- Im Browser: in MakeCode **Importieren → Importiere URL** und `https://github.com/norobb/flappybird` einfügen.
- Lokal (Node 20+): `npx makecode build` (Hardware-Build) bzw. `npx makecode build -j` (JavaScript, `built/binary.js`). Simulator: `npx makecode serve`.

Der Code liegt in `main.ts`, die Grafiken in `images.g.ts`/`images.g.jres` (nur im MakeCode-Editor ändern).

## Workflows

| Workflow | Auslöser | Aufgabe |
|---|---|---|
| `ci.yml` | Push/PR auf `master` | Projekt bauen, Build als Artefakt ablegen |
| `pages.yml` | Push auf `master` | Spielseite auf GitHub Pages veröffentlichen |
| `release.yml` | Release erstellt | `binary.js` und `binary.hex` am Release anhängen |

# 🏆 World Cup 2026 Sweepstake Generator

> A type-safe React application built using TypeScript to dynamically manage World Cup teams and sweepstake pools between players evenly.

---

## Live demo - https://sweepstake-ashen.vercel.app/

## 🚀 Key Features

* **Three-Phase State Workflow:** Utilizes robust conditional rendering to guide users through a multi-step user experience: Registration, Random Draft Allocation and Final Results Display.
* **Algorithmic Asset Allocation:** Automatically calculates the fair maximum number of teams per person on the fly based on the player pool size (`Math.floor(48 / players.length)`).
* **Immutable State Updates:** Leverages advanced array manipulation (`.map()`, `.filter()`, and spread operators) to smoothly update React state without mutating raw data.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18
* **Language:** TypeScript (Strict type interfaces for tracking `Player` schemas)
* **State Management:** Functional React Hooks (`useState`)
* **Styling:** Dynamic inline layouts (Flexbox configuration)

---

## 🧠 Technical Challenges & Key Learnings

### 1. Complex Multistate Synchronization & State Immutability
**Challenge:** During the draft phase, assigning a random team to a specific player requires updating three independent pieces of data at once: pushing a country into a player's private list, removing that specific country from the master list of 48 nations, and ensuring no arrays are accidentally mutated directly.

**Solution:** Designed a unified `teamAdder` handler that handles the draft workflow smoothly. By utilizing the functional update pattern with `.map()` and the spread operator (`...`), the application seamlessly identifies the selected player, appends their new team, and cleanses the global array using `.filter()` to keep the state architecture strictly predictable and bug-free.


import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { bind } from './prime.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

      <button class="add">Add custom-square to DOM</button>
      <button class="update">Update attributes</button>
<button class="remove">Remove custom-square from DOM</button>
Hello
<canvas id="one"></canvas> <canvas id="two"></canvas>
<svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
<form>
  <div>
    <label for="number">
      Enter a number that is a zero-based index position in the fibonacci
      sequence to see what number is in that position. For example, enter 6 and
      you'll get a result of 8 — the fibonacci number at index position 6 is 8.
    </label>
    <input type="number" id="number" />
  </div>
  <div>
    <input type="submit" />
  </div>
</form>
<p id="result"></p>

<section id="spacer"></section>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


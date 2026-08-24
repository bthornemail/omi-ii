
import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { bind } from './bind.ts'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div>
      <button class="add">Add custom-square to DOM</button>
      <button class="update">Update attributes</button>
<button class="remove">Remove custom-square from DOM</button>
Hello
<canvas id="one"></canvas>
x<canvas id="two"></canvas>
<svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
<button id="dec" aria-label="Decrement">-</button>
<span id="currentValue">0</span>
<button id="inc" aria-label="Increment">+</button>
<p id="result"></p>
<section id="spacer"></section>
</div>`

bind(document.querySelector<HTMLButtonElement>('#counter')!)


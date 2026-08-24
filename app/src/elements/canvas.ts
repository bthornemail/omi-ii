import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<canvas id="geometryCanvas" width="500" height="500"></canvas>

`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

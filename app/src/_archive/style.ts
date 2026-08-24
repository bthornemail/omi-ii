document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<>
  <style>
    body { background: #111; color: #fff; font-family: sans-serif; display: flex; gap: 20px; padding: 20px; }
    canvas { background: #000; border: 2px solid #333; }
    #uiCardContainer { display: flex; flex-direction: column; gap: 10px; width: 250px; }
    .user-badge { background: #222; padding: 10px; border-left: 4px solid #00ffcc; border-radius: 4px; }
  </style>
  <style>
    body { background: #111; color: #fff; font-family: monospace; padding: 20px; }
    canvas { background: #000; border: 1px solid #333; margin-top: 10px; }
    #log { font-size: 11px; color: #888; max-height: 80px; overflow: hidden; }
  </style>
</>`

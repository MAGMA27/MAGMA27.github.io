let diagramId = 0
let rendering = false

function getTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default'
}

export async function renderMermaid() {
  if (rendering) return

  const codeBlocks = Array.from(
    document.querySelectorAll<HTMLElement>(
      '#markdown-wrapper .code-block[data-language="mermaid"] pre code',
    ),
  )
  if (codeBlocks.length === 0) return

  rendering = true

  try {
    const { default: mermaid } = await import('mermaid')

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: getTheme(),
    })

    for (const code of codeBlocks) {
      const codeBlock = code.closest<HTMLElement>('.code-block')
      if (!codeBlock || codeBlock.dataset.mermaidRendered === 'true') continue

      const source = code.textContent?.trim()
      if (!source) continue

      try {
        const { svg, bindFunctions } = await mermaid.render(
          `mermaid-diagram-${diagramId++}`,
          source,
        )
        const diagram = document.createElement('div')
        diagram.className = 'mermaid-diagram'
        diagram.setAttribute('role', 'img')
        diagram.setAttribute('aria-label', 'Mermaid diagram')
        diagram.innerHTML = svg

        codeBlock.replaceChildren(diagram)
        codeBlock.dataset.mermaidRendered = 'true'
        bindFunctions?.(diagram)
      } catch (error) {
        console.error('Failed to render Mermaid diagram', error)
      }
    }
  } finally {
    rendering = false
  }
}

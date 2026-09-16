type FontSource =
  | string
  | null
  | { family: string; weights?: number[] }
  | { family: string; stylesheet: string }
  | { family: string; src: string; weight?: string; style?: string }

export type FontConfig = Record<'sans' | 'serif' | 'monospace', FontSource>

const fallbacks = {
  sans: 'ui-sans-serif, system-ui, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
  monospace: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
}

// Quote CSS strings, including characters that could terminate an HTML style tag.
function cssString(value: string) {
  return `"${value.replace(/["\\\n\r\f<>]/g, (character) =>
    `\\${character.charCodeAt(0).toString(16)} `
  )}"`
}

export function resolveFonts(fonts: FontConfig) {
  const stylesheets = new Set<string>()
  const declarations: string[] = []
  const faces = new Set<string>()

  for (const slot of Object.keys(fallbacks) as (keyof FontConfig)[]) {
    const setting = fonts[slot]
    const font = typeof setting === 'string' ? { family: setting } : setting
    const family = font?.family.trim()
    declarations.push(
      `--site-font-${slot}: ${family ? `${cssString(family)}, ` : ''}${fallbacks[slot]};`
    )
    if (!font || !family) continue

    if ('stylesheet' in font) {
      stylesheets.add(font.stylesheet)
    } else if ('src' in font) {
      const weight = font.weight ?? '400'
      const style = font.style ?? 'normal'
      if (!/^(normal|bold|[1-9]\d{0,2}|1000)( ([1-9]\d{0,2}|1000))?$/.test(weight) ||
          !/^(normal|italic|oblique)$/.test(style)) {
        throw new Error(`Invalid font weight or style for fonts.${slot} in app/config.js`)
      }
      faces.add(`@font-face { font-family: ${cssString(family)}; src: url(${cssString(font.src)}); font-weight: ${weight}; font-style: ${style}; font-display: swap; }`)
    } else {
      const weights = [...new Set(font.weights ?? [])].sort((a, b) => a - b)
      if (weights.some((weight) => !Number.isInteger(weight) || weight < 1 || weight > 1000)) {
        throw new Error(`Invalid Google font weights for fonts.${slot} in app/config.js`)
      }
      const query = new URLSearchParams({
        family: family + (weights.length ? `:wght@${weights.join(';')}` : ''),
        display: 'swap',
      })
      stylesheets.add(`https://fonts.googleapis.com/css2?${query}`)
    }
  }

  return {
    stylesheets: [...stylesheets],
    css: `:root { ${declarations.join(' ')} }\n${[...faces].join('\n')}`,
  }
}

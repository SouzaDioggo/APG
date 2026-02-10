import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Paleta APG
        'apg': {
          'azul-institucional': '#1a4d7a',
          'azul-escuro': '#0d2d4a',
          'dourado': '#c9a961',
          'cinza-escuro': '#2c3e50',
          'cinza-claro': '#ecf0f1',
          'branco': '#ffffff',
        }
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

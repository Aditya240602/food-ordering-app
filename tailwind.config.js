/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        'elegant': ['var(--font-playfair)', 'Georgia', 'serif'],
        'modern': ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        'friendly': ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-large': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        'display-medium': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-elegant': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-elegant': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-modern': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'body-friendly': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        'tight': '-0.02em',
        'tighter': '-0.03em',
        'tightest': '-0.04em',
        'wide': '0.01em',
        'wider': '0.02em',
      },
    },
  },
  plugins: [],
}
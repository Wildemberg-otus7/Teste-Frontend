// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",   // Inclui todos os arquivos em app/
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // e components/ (se houver)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // (se usar /pages)
    // ... outros paths se necessário
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#0500FF',
        'blue-10': '#EDFFFB',
        black: '#1C1C1C',
        'gray-20': '#9E9E9E',
        'gray-10': '#DFDFDF',
        'gray-05': '#F5F5F5',
        'gray-00': '#F0F0F0',
        white: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        h1: ['20px', { lineHeight: '1.5' }],
        h2: ['16px', { lineHeight: '1.4' }],
        h3: ['16px', { lineHeight: '1.3' }]
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '20': '20px',
        '28': '28px',
        '32': '32px',
        '40': '40px',
        '60': '60px',
        '80': '80px'
      }
    }
  },
  plugins: []
};

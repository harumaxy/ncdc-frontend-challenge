import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-gray': '#F5F8FA',
        primary: '#32A8F8',
      },
      fontFamily: {
        'noto-sans-jp': ['"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};

export default config;

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f4f3ff',
          '100': '#ece9fe',
          '200': '#dbd5ff',
          '300': '#c0b4fe',
          '400': '#a189fc',
          '500': '#7749f8',
          '600': '#7337f0',
          '700': '#6425dc',
          '800': '#531eb9',
          '900': '#471b97',
          '950': '#2a0f66',
        },      
      },
      height: {
        'screen-nav': 'calc(100vh - 64px)',
        'screen-nav2': 'calc(100vh - calc(96px + 64px))',
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "-1": "-1",
      },
    },
  },
  plugins: [],
}
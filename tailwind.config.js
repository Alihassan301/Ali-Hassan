export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        pearl: "#FAF9F6",
        ivory: "#F1EFE9",
        cobalt: "#315EF7",
        royal: "#3730A3",
        iris: "#8B5CF6",
        lavender: "#E9E5FF",
        ice: "#DCEBFF",
        graphite: "#252632",
        mist: "#70717D",
      },
      fontFamily: {
        display: ['"Clash Display"', "Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ['"DM Serif Display"', "Georgia", "Times New Roman", "serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

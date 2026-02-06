const path = require('path')

module.exports = {
  presets: [
    require(path.resolve(__dirname, '../node_modules/frappe-ui/tailwind/preset.js'))
  ],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla", "sans"],
        lora:["Lora"]
      },
      colors: {
        custom: {
          // Tambahkan warna-warna kustom Anda di sini
          maize: "#FBEC52",
          liconice: "#2A1C1C",
          background: "#5E1219",
        },
        animate: {
          testtt: 'fadeIn 1s ease-in-out', // Nama animasi harus sesuai dengan yang Anda gunakan dalam kelas HTML
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
      },
    },
  },
  plugins: [],
}


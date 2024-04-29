/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
          xs:"11px",
          head:"20px",
          lg:"16px"
      },
      backgroundColor:{
          "light":'#ffffff',
          "b-light":'#f5f5f5',
          "dark":"#000000",
          "b-dark":"#242424"
      },
      fontFamily:{
        poppins:[ 'Roboto', "sans-serif"]
      },
      fontWeight:{
        ligh:"300",
        medium:"400",
        norm:"500",
        bold:"700",
        bolder:"900"
      },
      screens:{
        sm:"270px",
        md:"868px",
        lg:"1200px"
      }
    },
  },
  plugins: [],
}
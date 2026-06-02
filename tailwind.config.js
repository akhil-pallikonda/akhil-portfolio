/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                appleBlack: '#000000',
                appleSurface: '#1C1C1E',
                appleText: '#F5F5F7',
                appleMuted: '#86868B',
                appleBlue: '#2997FF',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
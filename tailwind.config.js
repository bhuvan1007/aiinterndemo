/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                // Extend colors if needed to match global css variables, 
                // but for now relying on arbitrary values or standard palette
            }
        },
    },
    plugins: [],
}

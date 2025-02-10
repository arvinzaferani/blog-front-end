/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: {
                    light: "#FFFFFF",
                    dark: "#000000",
                },
                text: {
                    light: "#000000",
                    dark: "#FFFFFF",
                },
                border: {
                    light: "#E5E5E5",
                    dark: "#2D2D2D",
                },
                accent: {
                    light: "#F3F3F3",
                    dark: "#1A1A1A",
                },
                muted: {
                    light: "#A0A0A0",
                    dark: "#707070",
                },
            },
        },
    },
    plugins: [],
}


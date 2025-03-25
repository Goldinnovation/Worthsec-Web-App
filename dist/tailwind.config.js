/** @type {import('tailwindcss').Config} */
import { join } from 'path';
module.exports = {
    content: [
        join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,ts,jsx,tsx,mdx}",
        // Or if using `src` directory:
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: []
};

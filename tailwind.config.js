/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wedding: {
                    primary: '#D4AF37', // Gold
                    secondary: '#F8F8FF', // Ghost White
                    accent: '#FFB6C1', // Light Pink
                    dark: '#2C3E50', // Dark Blue Gray
                    light: '#FAFAFA' // Off White
                },
                primary: {
                    50: '#fef7f0',
                    100: '#feeee0',
                    200: '#fcd9c0',
                    300: '#f9bd95',
                    400: '#f59567',
                    500: '#f17744',
                    600: '#e25d2a',
                    700: '#bc4820',
                    800: '#953a1f',
                    900: '#78321e',
                },
                rose: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                }
            },
            fontFamily: {
                'serif': ['Playfair Display', 'serif'],
                'sans': ['Inter', 'sans-serif'],
                'script': ['Dancing Script', 'cursive'],
                'dancing': ['Dancing Script', 'cursive'],
                'playfair': ['Playfair Display', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio')
    ],
}
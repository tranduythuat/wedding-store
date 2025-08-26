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
                }
            },
            fontFamily: {
                'serif': ['Playfair Display', 'serif'],
                'sans': ['Inter', 'sans-serif'],
                'script': ['Dancing Script', 'cursive']
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
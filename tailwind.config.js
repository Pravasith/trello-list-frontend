module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "fl-blue": "#0071bc",
                "my-gray": "#4d4d4d",
                "fl-green": "#00ff00",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

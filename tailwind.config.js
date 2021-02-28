module.exports = {
    purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                "serif": ['"DM Sans"', "sans-serif"],
                "mono": ['Inconsolata', 'consolas', 'monospace']
            }
        },
    },
    variants: {
        extend: {
            boxShadow: ["hover", "active"],
            transform: ["hover", "active"],
            translate: ["hover", "active"]
        },
    },
    plugins: [],
}

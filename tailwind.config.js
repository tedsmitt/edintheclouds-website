module.exports = {
  darkMode: "media",
  purge: {
    mode: "all",
    content: ["./_site/**/*.html"],
  },
  theme: {
    extend: {
      colors: {
        dark: "#24283b",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            a: {
              color: theme("colors.blue.700"),
              "&:hover": {
                color: theme("colors.blue.700"),
                textDecoration: "none",
              },
            },
            "h2 a": {
              color: theme("colors.gray.900"),
              textDecoration: "none",
            },
            ".tag a": {
              textDecoration: "none",
            },
          },
        },

        dark: {
          css: {
            color: theme("colors.gray.400"),
            a: {
              color: "#9ECE6A",
              "&:hover": {
                color: "#9ECE6A",
              },
            },

            "h2 a": {
              color: theme("colors.gray.400"),
            },

            h1: {
              color: theme("colors.gray.400"),
            },
            h2: {
              color: theme("colors.gray.400"),
            },
            h3: {
              color: theme("colors.gray.400"),
            },
            h4: {
              color: theme("colors.gray.400"),
            },
            h5: {
              color: theme("colors.gray.400"),
            },
            h6: {
              color: theme("colors.gray.400"),
            },

            strong: {
              color: theme("colors.gray.400"),
            },

            code: {
              color: theme("colors.gray.400"),
            },

            figcaption: {
              color: theme("colors.gray.500"),
            },

            blockquote: {
              color: theme("colors.gray.500"),
            },

            "::selection": {
              backgroundColor: "#6f7bb635",
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], safelist: [
    {
      // Text sizes - xs to 6xl covers most use cases
      pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/,
      variants: ['xl', '2xl', '3xl'],
    },
    {
      // Width/height - up to 32 for larger elements like logos/images
      pattern: /(w|h)-(1|2|3|4|5|6|7|8|9|10|11|12|14|16|18|20|24|28|32)/,
      variants: ['xl', '2xl', '3xl'],
    },
    {
      // All padding combinations - p, px, py  
      pattern: /p(x|y)?-(0|1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['xl', '2xl', '3xl'],
    },
    {
      // All margin combinations - m, mb, etc
      pattern: /m(x|y|t|b|l|r)?-(0|1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['xl', '2xl', '3xl'],
    },    {
      // All gap sizes 
      pattern: /gap-(0|1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['xl', '2xl', '3xl'],
    },
    // Height classes: h-[60vh] through h-[75vh] with responsive variants
    'h-[60vh]', 'h-[61vh]', 'h-[62vh]', 'h-[63vh]', 'h-[64vh]', 'h-[65vh]', 'h-[66vh]', 'h-[67vh]', 
    'h-[68vh]', 'h-[69vh]', 'h-[70vh]', 'h-[71vh]', 'h-[72vh]', 'h-[73vh]', 'h-[74vh]', 'h-[75vh]',
    'max-h-[60vh]', 'max-h-[61vh]', 'max-h-[62vh]', 'max-h-[63vh]', 'max-h-[64vh]', 'max-h-[65vh]', 
    'max-h-[66vh]', 'max-h-[67vh]', 'max-h-[68vh]', 'max-h-[69vh]', 'max-h-[70vh]', 'max-h-[71vh]', 
    'max-h-[72vh]', 'max-h-[73vh]', 'max-h-[74vh]', 'max-h-[75vh]',
    '2xl:h-[60vh]', '2xl:h-[61vh]', '2xl:h-[62vh]', '2xl:h-[63vh]', '2xl:h-[64vh]', '2xl:h-[65vh]', 
    '2xl:h-[66vh]', '2xl:h-[67vh]', '2xl:h-[68vh]', '2xl:h-[69vh]', '2xl:h-[70vh]', '2xl:h-[71vh]', 
    '2xl:h-[72vh]', '2xl:h-[73vh]', '2xl:h-[74vh]', '2xl:h-[75vh]',
    '2xl:max-h-[60vh]', '2xl:max-h-[61vh]', '2xl:max-h-[62vh]', '2xl:max-h-[63vh]', '2xl:max-h-[64vh]', 
    '2xl:max-h-[65vh]', '2xl:max-h-[66vh]', '2xl:max-h-[67vh]', '2xl:max-h-[68vh]', '2xl:max-h-[69vh]', 
    '2xl:max-h-[70vh]', '2xl:max-h-[71vh]', '2xl:max-h-[72vh]', '2xl:max-h-[73vh]', '2xl:max-h-[74vh]', 
    '2xl:max-h-[75vh]',
    '3xl:h-[60vh]', '3xl:h-[61vh]', '3xl:h-[62vh]', '3xl:h-[63vh]', '3xl:h-[64vh]', '3xl:h-[65vh]', 
    '3xl:h-[66vh]', '3xl:h-[67vh]', '3xl:h-[68vh]', '3xl:h-[69vh]', '3xl:h-[70vh]', '3xl:h-[71vh]', 
    '3xl:h-[72vh]', '3xl:h-[73vh]', '3xl:h-[74vh]', '3xl:h-[75vh]',
    '3xl:max-h-[60vh]', '3xl:max-h-[61vh]', '3xl:max-h-[62vh]', '3xl:max-h-[63vh]', '3xl:max-h-[64vh]', 
    '3xl:max-h-[65vh]', '3xl:max-h-[66vh]', '3xl:max-h-[67vh]', '3xl:max-h-[68vh]', '3xl:max-h-[69vh]', 
    '3xl:max-h-[70vh]', '3xl:max-h-[71vh]', '3xl:max-h-[72vh]', '3xl:max-h-[73vh]', '3xl:max-h-[74vh]', 
    '3xl:max-h-[75vh]'
  ], 
  theme: {    
    extend: {
      screens: {
        '3xl': '1920px', // Custom breakpoint for very large screens
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

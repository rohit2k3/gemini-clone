// // Global color configuration for Gemini Frontend
// export const colors = {
//   // Primary Gemini brand colors
// primary: {
//   50: "#f3f0ff",
//   100: "#e3dcff",
//   200: "#c1b3fe",
//   300: "#9b8afc",
//   400: "#7e66f8",
//   500: "#6750f8", // Gemini-like main
//   600: "#5b44e6",
//   700: "#5037d4",
//   800: "#3f2db1",
//   900: "#2f248e",
//   950: "#1c155e",
// },


//   // Secondary colors
//   secondary: {
//     50: "#f8fafc",
//     100: "#f1f5f9",
//     200: "#e2e8f0",
//     300: "#cbd5e1",
//     400: "#94a3b8",
//     500: "#64748b",
//     600: "#475569",
//     700: "#334155",
//     800: "#1e293b",
//     900: "#0f172a",
//     950: "#020617",
//   },

//   // Accent colors for highlights and interactions
//   accent: {
//     purple: {
//       50: "#faf5ff",
//       100: "#f3e8ff",
//       200: "#e9d5ff",
//       300: "#d8b4fe",
//       400: "#c084fc",
//       500: "#a855f7",
//       600: "#9333ea",
//       700: "#7c3aed",
//       800: "#6b21a8",
//       900: "#581c87",
//     },
//     cyan: {
//       50: "#ecfeff",
//       100: "#cffafe",
//       200: "#a5f3fc",
//       300: "#67e8f9",
//       400: "#22d3ee",
//       500: "#06b6d4",
//       600: "#0891b2",
//       700: "#0e7490",
//       800: "#155e75",
//       900: "#164e63",
//     },
//     emerald: {
//       50: "#ecfdf5",
//       100: "#d1fae5",
//       200: "#a7f3d0",
//       300: "#6ee7b7",
//       400: "#34d399",
//       500: "#10b981",
//       600: "#059669",
//       700: "#047857",
//       800: "#065f46",
//       900: "#064e3b",
//     },
//     amber: {
//       50: "#fffbeb",
//       100: "#fef3c7",
//       200: "#fde68a",
//       300: "#fcd34d",
//       400: "#fbbf24",
//       500: "#f59e0b",
//       600: "#d97706",
//       700: "#b45309",
//       800: "#92400e",
//       900: "#78350f",
//     },
//   },

//   // Semantic colors
//   semantic: {
//     success: {
//       50: "#f0fdf4",
//       100: "#dcfce7",
//       200: "#bbf7d0",
//       300: "#86efac",
//       400: "#4ade80",
//       500: "#22c55e",
//       600: "#16a34a",
//       700: "#15803d",
//       800: "#166534",
//       900: "#14532d",
//     },
//     warning: {
//       50: "#fffbeb",
//       100: "#fef3c7",
//       200: "#fde68a",
//       300: "#fcd34d",
//       400: "#fbbf24",
//       500: "#f59e0b",
//       600: "#d97706",
//       700: "#b45309",
//       800: "#92400e",
//       900: "#78350f",
//     },
//     error: {
//       50: "#fef2f2",
//       100: "#fee2e2",
//       200: "#fecaca",
//       300: "#fca5a5",
//       400: "#f87171",
//       500: "#ef4444",
//       600: "#dc2626",
//       700: "#b91c1c",
//       800: "#991b1b",
//       900: "#7f1d1d",
//     },
//     info: {
//       50: "#eff6ff",
//       100: "#dbeafe",
//       200: "#bfdbfe",
//       300: "#93c5fd",
//       400: "#60a5fa",
//       500: "#3b82f6",
//       600: "#2563eb",
//       700: "#1d4ed8",
//       800: "#1e40af",
//       900: "#1e3a8a",
//     },
//   },

//   // Neutral grays
//   neutral: {
//     50: "#fafafa",
//     100: "#f5f5f5",
//     200: "#e5e5e5",
//     300: "#d4d4d4",
//     400: "#a3a3a3",
//     500: "#737373",
//     600: "#525252",
//     700: "#404040",
//     800: "#262626",
//     900: "#171717",
//     950: "#0a0a0a",
//   },

//   // Gemini gradient colors
//   gradient: {
//    primary: "linear-gradient(135deg, #6750f8 0%, #8b5cf6 35%, #22d3ee 65%, #06b6d4 100%)",
//     secondary: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
//     dark: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
//     purple: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
//     blue: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
//     emerald: "linear-gradient(135deg, #10b981 0%, #22c55e 100%)",
//   },

//   // Theme-specific colors
//   light: {
//     background: "#ffffff",
//     foreground: "#0f172a",
//     card: "#ffffff",
//     cardForeground: "#0f172a",
//     popover: "#ffffff",
//     popoverForeground: "#0f172a",
//     muted: "#f8fafc",
//     mutedForeground: "#64748b",
//     border: "#e2e8f0",
//     input: "#e2e8f0",
//     ring: "#6366f1",
//   },

//   dark: {
//     background: "#020617",
//     foreground: "#f8fafc",
//     card: "#0f172a",
//     cardForeground: "#f8fafc",
//     popover: "#0f172a",
//     popoverForeground: "#f8fafc",
//     muted: "#1e293b",
//     mutedForeground: "#94a3b8",
//     border: "#334155",
//     input: "#334155",
//     ring: "#8b93f8",
//   },
// } as const

// // Helper function to get CSS custom properties
// export const getCSSVariables = (theme: "light" | "dark" = "light") => {
//   const themeColors = theme === "dark" ? colors.dark : colors.light

//   return {
//     "--background": themeColors.background,
//     "--foreground": themeColors.foreground,
//     "--card": themeColors.card,
//     "--card-foreground": themeColors.cardForeground,
//     "--popover": themeColors.popover,
//     "--popover-foreground": themeColors.popoverForeground,
//     "--primary": colors.primary[500],
//     "--primary-foreground": "#ffffff",
//     "--secondary": colors.secondary[100],
//     "--secondary-foreground": colors.secondary[900],
//     "--muted": themeColors.muted,
//     "--muted-foreground": themeColors.mutedForeground,
//     "--accent": colors.secondary[100],
//     "--accent-foreground": colors.secondary[900],
//     "--destructive": colors.semantic.error[500],
//     "--destructive-foreground": "#ffffff",
//     "--border": themeColors.border,
//     "--input": themeColors.input,
//     "--ring": themeColors.ring,
//     "--radius": "12px",
//     "--gemini-gradient": colors.gradient.primary,
//   }
// }

// // Utility function to convert hex to RGB values for CSS
// export const hexToRgb = (hex: string): string => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
//   if (!result) return "0 0 0"

//   return [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)].join(" ")
// }

// // Export commonly used color combinations
// export const colorCombinations = {
//   geminiLogo: {
//     background: colors.gradient.primary,
//     foreground: "#ffffff",
//   },
//   userMessage: {
//     background: colors.primary[500],
//     foreground: "#ffffff",
//   },
//   aiMessage: {
//     light: {
//       background: colors.secondary[50],
//       foreground: colors.secondary[900],
//       border: colors.secondary[200],
//     },
//     dark: {
//       background: colors.secondary[800],
//       foreground: colors.secondary[100],
//       border: colors.secondary[700],
//     },
//   },
//   sidebar: {
//     light: {
//       background: `${colors.light.card}/80`,
//       border: `${colors.light.border}/50`,
//     },
//     dark: {
//       background: `${colors.dark.card}/80`,
//       border: `${colors.dark.border}/50`,
//     },
//   },
// }

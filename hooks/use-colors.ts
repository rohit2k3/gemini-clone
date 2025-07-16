"use client"

import { useTheme } from "next-themes"
import { colors, colorCombinations } from "@/lib/config/colors"

export function useColors() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return {
    // Direct access to color palette
    colors,

    // Theme-aware color combinations
    combinations: {
      ...colorCombinations,
      aiMessage: isDark ? colorCombinations.aiMessage.dark : colorCombinations.aiMessage.light,
      sidebar: isDark ? colorCombinations.sidebar.dark : colorCombinations.sidebar.light,
    },

    // Utility functions
    getThemeColor: (lightColor: string, darkColor: string) => (isDark ? darkColor : lightColor),

    // Common color getters
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    success: colors.semantic.success[500],
    warning: colors.semantic.warning[500],
    error: colors.semantic.error[500],
    info: colors.semantic.info[500],

    // Gradient utilities
    gradients: colors.gradient,

    // Theme state
    isDark,
    theme,
  }
}

// src/theme/paperTheme.ts
import { MD3DarkTheme, type MD3Theme } from "react-native-paper";

export const paperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 14, // cantos mais arredondados (cards/inputs)
  colors: {
    ...MD3DarkTheme.colors,

    // Marca (verde neon do layout ~ #19E65D / rgb(25,230,93))
    primary: "#19E65D",
    onPrimary: "#06130A",

    // Variações (usadas em chips, estados, containers)
    primaryContainer: "#0E2A18",
    onPrimaryContainer: "#B9F7D0",

    secondary: "#7CE7A8",
    onSecondary: "#06130A",
    secondaryContainer: "#163022",
    onSecondaryContainer: "#CFF9DE",

    // Fundo / superfícies (dark “fosco”)
    background: "#0F1410",
    onBackground: "#E6F0E8",

    surface: "#121A14",
    onSurface: "#E6F0E8",

    surfaceVariant: "#1B241D",
    onSurfaceVariant: "#C7D4C9",

    // Bordas e separadores sutis
    outline: "#2A3A2F",
    outlineVariant: "#223126",

    // Texto “menos importante”
    inverseSurface: "#E6F0E8",
    inverseOnSurface: "#0F1410",

    // Erros
    error: "#FF5A5F",
    onError: "#1B0002",

    // Sombras/elevation (Paper controla muito disso internamente)
    shadow: "#000000",
    scrim: "#000000",
  },
};

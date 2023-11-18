const Mocha = {
  Rosewater: "#f5e0dc",
  Flamingo: "#f2cdcd",
  Pink: "#f5c2e7",
  Mauve: "#cba6f7",
  Red: "#f38ba8",
  Maroon: "#eba0ac",
  Peach: "#fab387",
  Yellow: "#f9e2af",
  Green: "#a6e3a1",
  Teal: "#94e2d5",
  Sky: "#89dceb",
  Sapphire: "#74c7ec",
  Blue: "#89b4fa",
  Lavender: "#b4befe",
  Text: "#cdd6f4",
  Subtext1: "#bac2de",
  Subtext0: "#a6adc8",
  Overlay2: "#9399b2",
  Overlay1: "#7f849c",
  Overlay0: "#6c7086",
  Surface2: "#585b70",
  Surface1: "#45475a",
  Surface0: "#313244",
  Base: "#1e1e2e",
  Mantle: "#181825",
  Crust: "#11111b",
};
const Latte = {
  Rosewater: "#dc8a78",
  Flamingo: "#dd7878",
  Pink: "#ea76cb",
  Mauve: "#8839ef",
  Red: "#d20f39",
  Maroon: "#e64553",
  Peach: "#fe640b",
  Yellow: "#df8e1d",
  Green: "#40a02b",
  Teal: "#179299",
  Sky: "#04a5e5",
  Sapphire: "#209fb5",
  Blue: "#1e66f5",
  Lavender: "#7287fd",
  Text: "#4c4f69",
  Subtext1: "#5c5f77",
  Subtext0: "#6c6f85",
  Overlay2: "#7c7f93",
  Overlay1: "#8c8fa1",
  Overlay0: "#9ca0b0",
  Surface2: "#acb0be",
  Surface1: "#bcc0cc",
  Surface0: "#ccd0da",
  Base: "#eff1f5",
  Mantle: "#e6e9ef",
  Crust: "#dce0e8",
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            ...Mocha,
            primary: {
              main: Mocha.Lavender,
            },
            secondary: {
              main: Mocha.Blue,
            },
            background: {
              default: Mocha.Crust,
              neutral: Mocha.Base,
              alt: Mocha.Mantle,
            },
            text: {
              primary: Mocha.Text,
              secondary: Mocha.Subtext1,
              disabled: Mocha.Overlay1,
            },
            error: {
              main: Mocha.Red,
            },
          }
        : {
            ...Latte,
            primary: {
              main: Latte.Lavender,
            },
            secondary: {
              main: Latte.Teal,
            },
            background: {
              default: Latte.Mantle,
              neutral: Latte.Base,
              alt: Latte.Crust,
            },
            text: {
              primary: Latte.Text,
              secondary: Latte.Subtext1,
              disabled: Latte.Overlay1,
            },
            error: {
              main: Latte.Red,
            },
          }),
    },
  };
};

// globalTypes.d.ts
import "@mui/material/styles";
import "@mui/material/Button";
import '@mui/material/TextField';

export type FlexboxVariants = {
    start: Record<string, any>;
    center: Record<string, any>;
    centerAligned: Record<string, any>;
    end: Record<string, any>;
    between: Record<string, any>;
    around: Record<string, any>;
    evenly: Record<string, any>;
};

export type FlexboxAlign = {
    start: Record<string, any>;
    center: Record<string, any>;
    end: Record<string, any>;
    stretch: Record<string, any>;
    baseline: Record<string, any>;
};

export type FlexboxObject = {
    row: FlexboxVariants;
    column: FlexboxVariants;
    align: FlexboxAlign;
    center: Record<string, any>;
};

export type CustomPalette = {
    path: {
        orange: string;
        cyan: string;
        blue: string;
        trail: string;
        pink: string;
        purple: string;
    };
    bgPink: string;
    bgPurple: string;
    backgroundDark: string;
    hint: string;
};

declare module "@mui/material/styles" {
    interface Theme {
        flexbox: FlexboxObject;
        custom: {
            slider: {
                param?: (theme: Theme) => object;
            },
            scrollbar: {
                chat: object;
                messages: object;
            };
        }
    }

    interface ThemeOptions {
        flexbox?: FlexboxObject;
        custom: {
            slider: {
                param?: (theme: Theme) => object;
            },
            scrollbar: {
                chat: object;
                messages: object;
            };
        }
    }

    interface Palette {
        custom: CustomPalette;
    }

    interface PaletteOptions {
        custom?: CustomPalette;
    }
}
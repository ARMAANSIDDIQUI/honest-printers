"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ThemeAwareToaster() {
    const { theme = "system" } = useTheme();

    return (
        <Toaster
            richColors
            closeButton
            position="top-center"
            theme={theme}
        />
    );
}

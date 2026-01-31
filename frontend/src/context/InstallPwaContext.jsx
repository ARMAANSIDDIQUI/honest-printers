"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";

const InstallPwaContext = createContext({
    prompt: null,
    install: () => { },
    isInstallable: false,
});

export const useInstallPwa = () => useContext(InstallPwaContext);

export function InstallPwaProvider({ children }) {
    const [prompt, setPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setPrompt(e);
            setIsInstallable(true);

            // Check if we showed the toast recently (2 hours)
            const lastToastTime = localStorage.getItem('installToastTime');
            const now = Date.now();
            const twoHours = 2 * 60 * 60 * 1000;

            if (!lastToastTime || (now - lastToastTime) > twoHours) {
                // Show toast after a delay
                setTimeout(() => {
                    toast("Install Honest App", {
                        description: "Install our app for a better experience.",
                        action: {
                            label: "Install",
                            onClick: () => e.prompt(),
                        },
                        icon: <Download className="w-4 h-4" />,
                        duration: 10000,
                    });
                    localStorage.setItem('installToastTime', now.toString());
                }, 5000);
            }
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const install = async () => {
        if (!prompt) return;
        prompt.prompt();
        const { outcome } = await prompt.userChoice;
        if (outcome === "accepted") {
            setPrompt(null);
            setIsInstallable(false);
        }
    };

    return (
        <InstallPwaContext.Provider value={{ prompt, install, isInstallable }}>
            {children}
        </InstallPwaContext.Provider>
    );
}

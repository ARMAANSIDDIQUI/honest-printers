"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Bell, BellOff, ShoppingBag, CheckCircle, Tag } from "lucide-react";
import { useSelector } from "react-redux";

const NotificationContext = createContext({
    permission: "default",
    requestPermission: async () => { },
    showNotification: () => { },
});

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
    const [permission, setPermission] = useState("default");

    // Triggers state
    const cart = useSelector((state) => state.cart);
    const [hasNotifiedCart, setHasNotifiedCart] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            toast.error("This browser does not support desktop notifications");
            return;
        }

        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === "granted") {
            new Notification("Notifications Enabled", {
                body: "You will now receive updates about your orders and offers!",
                icon: "/fav.png"
            });
        }
    };

    const showNotification = (title, options = {}) => {
        if (permission === "granted") {
            new Notification(title, {
                icon: "/fav.png",
                badge: "/fav.png", // Small icon for mobile status bar
                ...options
            });
        } else {
            // Fallback to toast if pushed not enabled/granted
            toast(title, {
                description: options.body,
                icon: options.iconUrl ? <img src={options.iconUrl} className="w-4 h-4 rounded-full" /> : <Bell className="w-4 h-4" />
            });
        }
    };

    // Trigger: Cart Abandonment (Simulated)
    useEffect(() => {
        if (cart.items.length > 0 && !hasNotifiedCart && permission === "granted") {
            const timer = setTimeout(() => {
                showNotification("Forgot something?", {
                    body: `You have ${cart.totalItems} items waiting in your cart!`,
                    tag: "cart-reminder"
                });
                setHasNotifiedCart(true);
            }, 10000); // 10 seconds for demo purposes (usually 1h+)

            return () => clearTimeout(timer);
        }
    }, [cart.items.length, hasNotifiedCart, permission]);

    // Trigger: New Discount (Simulated on permission grant or random)
    useEffect(() => {
        if (permission === "granted") {
            const timer = setTimeout(() => {
                // Low probability to not annoy
                if (Math.random() > 0.7) {
                    showNotification("Flash Sale! ALERT ⚡", {
                        body: "Get 20% OFF on all Flex Banners today!",
                        tag: "discount",
                        data: { url: "/products" }
                    });
                }
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, [permission]);


    return (
        <NotificationContext.Provider value={{ permission, requestPermission, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

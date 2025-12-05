"use client";

import React from "react";
import { Car, Wallet, Shield, Bell, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NotificationType = "TRANSPORT" | "PAYMENT" | "SYSTEM";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "TRANSPORT",
        title: "Chauffeur en route",
        message: "Jean-Pierre arrive dans 2 minutes avec une Toyota Corolla.",
        time: "Il y a 5 min",
        read: false,
    },
    {
        id: "2",
        type: "PAYMENT",
        title: "Paiement reçu",
        message: "Vous avez reçu 50 KENDA pour votre dernier trajet.",
        time: "Il y a 2 heures",
        read: true,
    },
    {
        id: "3",
        type: "SYSTEM",
        title: "Mise à jour de sécurité",
        message: "Votre compte a été vérifié avec succès. Vous êtes maintenant un passager vérifié.",
        time: "Hier",
        read: true,
    },
    {
        id: "4",
        type: "TRANSPORT",
        title: "Trajet terminé",
        message: "Merci d'avoir voyagé avec KENDA. N'oubliez pas de noter votre chauffeur.",
        time: "Hier",
        read: true,
    },
    {
        id: "5",
        type: "PAYMENT",
        title: "Recharge effectuée",
        message: "Votre portefeuille a été crédité de 100 ADA.",
        time: "Il y a 2 jours",
        read: true,
    }
];

export function NotificationsScreen() {
    return (
        <div className="h-full overflow-y-auto bg-black text-white pb-24 pt-safe">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 mb-2 border-b border-[#1A1A1A] flex items-center justify-between">
                <h1 className="text-xl font-heading font-bold text-white">
                    Notifications
                </h1>
                <Button
                    variant="ghost"
                    className="text-[#F0B90B] hover:text-[#F0B90B]/80 hover:bg-[#F0B90B]/10 text-xs font-bold h-8 px-3"
                    onClick={() => alert("Fonctionnalité à venir")}
                >
                    Tout marquer comme lu
                </Button>
            </header>

            {/* List */}
            <div className="px-4">
                {MOCK_NOTIFICATIONS.map((notif, index) => (
                    <NotificationItem
                        key={notif.id}
                        notification={notif}
                        isLast={index === MOCK_NOTIFICATIONS.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

function NotificationItem({ notification, isLast }: { notification: Notification, isLast: boolean }) {
    const getIcon = (type: NotificationType) => {
        switch (type) {
            case "TRANSPORT":
                return {
                    icon: Car,
                    bg: "bg-blue-500/10",
                    text: "text-blue-500"
                };
            case "PAYMENT":
                return {
                    icon: Wallet,
                    bg: "bg-[#F0B90B]/10",
                    text: "text-[#F0B90B]"
                };
            case "SYSTEM":
                return {
                    icon: Shield,
                    bg: "bg-green-500/10",
                    text: "text-green-500"
                };
            default:
                return {
                    icon: Bell,
                    bg: "bg-gray-500/10",
                    text: "text-gray-500"
                };
        }
    };

    const style = getIcon(notification.type);
    const Icon = style.icon;

    return (
        <div className={cn(
            "flex gap-4 py-4",
            !isLast && "border-b border-[#1A1A1A]"
        )}>
            {/* Icon */}
            <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                style.bg
            )}>
                <Icon className={cn("w-6 h-6", style.text)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={cn(
                        "font-bold text-sm truncate pr-2",
                        notification.read ? "text-white" : "text-white" // Could differentiate read state if needed
                    )}>
                        {notification.title}
                    </h3>
                    <span className="text-[10px] text-[#9A9A9A] shrink-0 mt-0.5">
                        {notification.time}
                    </span>
                </div>
                <p className="text-xs text-[#9A9A9A] leading-relaxed line-clamp-2">
                    {notification.message}
                </p>
                {!notification.read && (
                    <div className="mt-2 flex items-center gap-1 text-[#F0B90B]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                        <span className="text-[10px] font-bold">Nouveau</span>
                    </div>
                )}
            </div>
        </div>
    );
}

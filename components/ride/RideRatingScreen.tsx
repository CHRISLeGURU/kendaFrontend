import React, { useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RideRatingProps {
    price: string;
    onComplete: () => void;
}

export const RideRatingScreen = ({ price, onComplete }: RideRatingProps) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState("");

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md flex flex-col items-center text-center space-y-8"
            >
                {/* Header */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-[#F0B90B]/10 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="w-10 h-10 text-[#F0B90B]" />
                    </div>
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-white">
                        Vous êtes arrivé !
                    </h1>
                    <p className="text-[#9A9A9A] text-lg">
                        Merci d&apos;avoir voyagé avec Kenda.
                    </p>
                </div>

                {/* Price Display */}
                <div className="py-4">
                    <span className="font-heading font-extrabold text-5xl md:text-6xl text-[#F0B90B] tracking-tight">
                        {price}
                    </span>
                </div>

                {/* Rating Stars */}
                <div className="flex flex-col items-center space-y-4 w-full">
                    <p className="text-white font-medium">Comment s&apos;est passé votre trajet ?</p>
                    <div className="flex items-center gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    className={cn(
                                        "w-10 h-10 transition-colors duration-200",
                                        rating >= star
                                            ? "fill-[#F0B90B] text-[#F0B90B]"
                                            : "text-[#333333] hover:text-[#F0B90B]/50"
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment Input */}
                <div className="w-full space-y-2">
                    <Textarea
                        placeholder="Laissez un commentaire (optionnel)..."
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                        className="bg-[#0C0C0C] border-[#1A1A1A] text-white placeholder:text-[#555] min-h-[100px] resize-none rounded-xl focus-visible:ring-[#F0B90B]/50"
                    />
                </div>

                {/* Action Button */}
                <Button
                    onClick={onComplete}
                    className="w-full h-14 text-lg font-bold bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 rounded-xl shadow-lg mt-8"
                >
                    Envoyer & Fermer
                </Button>
            </motion.div>
        </div>
    );
};

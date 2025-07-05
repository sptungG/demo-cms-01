"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FormSection from "../blocks/form/FormSection";
import { Button } from "./button";

export interface IFixedFormButton {
    form?: {
        title?: string;
        description?: string;
        fields?: Array<{
            id?: string;
            label?: string;
            type?: "text" | "email" | "tel" | "textarea" | "select";
            placeholder?: string;
            required?: boolean;
            options?: string[];
            validation?: {
                pattern?: string;
                message?: string;
            };
        }>;
        submitButton?: {
            label?: string;
            action?: string;
        };
    };
    button?: {
        label?: string;
        position?: {
            top?: number;
            left?: number;
            right?: number;
            bottom?: number;
        };
    };
    name?: string;
}

interface Props {
    data: IFixedFormButton;
}

const getPositionStyle = (position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}) => {
    const defaultStyle = {
        bottom: "2rem",
        right: "2rem",
    };

    if (!position) return defaultStyle;

    const { top, left, right, bottom } = position;
    const style: Record<string, string> = {};

    if (top !== undefined) style.top = `${top}rem`;
    if (left !== undefined) style.left = `${left}rem`;
    if (right !== undefined) style.right = `${right}rem`;
    if (bottom !== undefined) style.bottom = `${bottom}rem`;

    return Object.keys(style).length > 0 ? style : defaultStyle;
};

const FixedFormButton = ({ data }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const modal = searchParams.get("modal");

    const comparedOpenModal = useMemo(() => {
        return modal?.toLowerCase().trim() === String(data.name).toLowerCase().trim();
    }, [modal, data.name]);


    useEffect(() => {
        setIsOpen(comparedOpenModal);
    }, [comparedOpenModal]);


    const handleOpenChange = (open: boolean) => {

        const params = new URLSearchParams(searchParams.toString());

        if (open) {
            params.set("modal", String(data.name));
        } else {
            params.delete("modal");
        }

        // Giữ các param khác, chỉ thay đổi modal
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed z-50 parentAbsolute"
                    style={getPositionStyle(data.button?.position)}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Button
                            size="lg"
                            className="rounded-full shadow-lg bg-vina-primary hover:bg-vina-primary/90 transition-all duration-300
                            ring-2 ring-offset-2 ring-vina-primary/20 hover:ring-vina-primary/40
                            hover:shadow-vina-primary/20 hover:shadow-xl"
                        >
                            <motion.span
                                animate={{
                                    scale: isHovered ? 1.05 : 1,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                {data.button?.label}
                            </motion.span>
                        </Button>
                        <motion.div
                            className="absolute inset-0 rounded-full bg-vina-primary/10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: isHovered ? 1.2 : 0.8,
                                opacity: isHovered ? 1 : 0,
                                transition: { duration: 0.3 },
                            }}
                        />
                    </motion.div>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <FormSection data={data.form} />
            </DialogContent>
        </Dialog>
    );
};

export default FixedFormButton;

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 seconds of premium branding time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="relative overflow-hidden">
                        <motion.h1
                            className="font-serif text-4xl md:text-6xl lg:text-8xl text-white tracking-widest uppercase"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1.2,
                                ease: [0.76, 0, 0.24, 1],
                                delay: 0.2,
                            }}
                        >
                            ERGOPACK INDIA
                        </motion.h1>

                        {/* Premium underline/line animation */}
                        <motion.div
                            className="h-[1px] bg-white/30 mt-4 mx-auto"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

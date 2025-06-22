'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t">
            <div className="container py-6 flex flex-col items-center justify-center space-y-2">
                <div className="text-sm text-muted-foreground">
                    © {currentYear} friendscope. All rights reserved.
                </div>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-1 text-sm text-muted-foreground"
                    >
                        <span>Code & Crafted with</span>
                        <motion.span
                            initial={{ scale: 1 }}
                            animate={{
                                scale: [1, 1.2, 1],
                                transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }
                            }}
                            className="inline-block text-yellow-400"
                        >
                            💛
                        </motion.span>
                        <span>by</span>
                        <Link
                            href="https://github.com/ChanMeng666/friendscope"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
                        >
                            Pranav Waykar
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>
        </footer>
    );
}

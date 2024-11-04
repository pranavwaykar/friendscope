'use client'

import React from 'react';
import Lottie from 'lottie-react';
import type { LottieComponentProps } from 'lottie-react';

interface LottieAnimationProps extends Partial<LottieComponentProps> {
    path: string;
    className?: string;
}

export const LottieAnimation = ({ path, className, ...props }: LottieAnimationProps) => {
    return (
        <div className={className}>
            <Lottie
                path={path}
                loop={true}
                autoplay={true}
                {...props}
            />
        </div>
    );
};

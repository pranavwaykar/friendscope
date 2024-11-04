// 'use client'
//
// import React from 'react';
// import Lottie from 'lottie-react';
// import type { LottieComponentProps } from 'lottie-react';
//
// interface LottieAnimationProps extends Partial<LottieComponentProps> {
//     path: string;
//     className?: string;
// }
//
// export const LottieAnimation = ({ path, className, ...props }: LottieAnimationProps) => {
//     return (
//         <div className={className}>
//             <Lottie
//                 path={path}
//                 loop={true}
//                 autoplay={true}
//                 {...props}
//             />
//         </div>
//     );
// };


'use client'

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import type { LottieComponentProps } from 'lottie-react';

interface LottieAnimationProps extends Partial<LottieComponentProps> {
    path: string;
    className?: string;
}

export const LottieAnimation = ({ path, className, ...props }: LottieAnimationProps) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        // Dynamically import the animation data
        fetch(path)
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error('Error loading animation:', error));
    }, [path]);

    if (!animationData) {
        return null; // Or a loading state
    }

    return (
        <div className={className}>
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                {...props}
            />
        </div>
    );
};

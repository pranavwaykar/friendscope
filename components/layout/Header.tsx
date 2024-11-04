// 'use client'
//
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Button } from '@/components/ui/button'
// import {
//     Sheet,
//     SheetContent,
//     SheetTrigger,
// } from "@/components/ui/sheet"
// import {
//     Menu,
//     Home,
//     ClipboardCheck,
//     Info,
//     History,
//     HelpCircle,
//     ChevronRight
// } from 'lucide-react'
//
// export function Header() {
//     const [isScrolled, setIsScrolled] = useState(false)
//     const [isMounted, setIsMounted] = useState(false)
//
//     useEffect(() => {
//         setIsMounted(true)
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 20)
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])
//
//     const navigationItems = [
//         { href: '/', label: 'Home', icon: Home },
//         // { href: '/assess', label: 'Assessment', icon: ClipboardCheck },
//         { href: '/about', label: 'About', icon: Info },
//         { href: '/history', label: 'History', icon: History },
//         { href: '/resources', label: 'Resources', icon: HelpCircle },
//         { href: '/assess', label: 'Assessment', icon: ClipboardCheck },
//     ]
//
//     if (!isMounted) return null
//
//     return (
//         <motion.header
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//                 isScrolled
//                     ? 'bg-white/80 backdrop-blur-md border-b shadow-sm'
//                     : 'bg-transparent'
//             }`}
//         >
//             <div className="container flex items-center justify-between h-16">
//                 <Link href="/" className="relative group">
//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="flex items-center"
//                     >
//                         <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//                             FriendScope
//                         </span>
//                         <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
//                     </motion.div>
//                 </Link>
//
//                 {/* Desktop Navigation */}
//                 <nav className="hidden md:flex items-center space-x-1">
//                     <AnimatePresence mode="wait">
//                         {navigationItems.map((item, index) => (
//                             <motion.div
//                                 key={item.href}
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                             >
//                                 <Link href={item.href}>
//                                     <Button
//                                         variant={item.href === '/assess' ? 'default' : 'ghost'}
//                                         className={`group relative ${
//                                             item.href === '/assess'
//                                                 ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
//                                                 : ''
//                                         }`}
//                                     >
//                                         <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
//                                         {item.label}
//                                         {item.href === '/assess' && (
//                                             <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                                         )}
//                                     </Button>
//                                 </Link>
//                             </motion.div>
//                         ))}
//                     </AnimatePresence>
//                 </nav>
//
//                 {/* Mobile Navigation */}
//                 <Sheet>
//                     <SheetTrigger asChild>
//                         <Button variant="outline" size="icon" className="md:hidden">
//                             <Menu className="h-5 w-5" />
//                             <span className="sr-only">Open menu</span>
//                         </Button>
//                     </SheetTrigger>
//                     <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//                         <nav className="flex flex-col space-y-4 mt-8">
//                             {navigationItems.map((item, index) => (
//                                 <motion.div
//                                     key={item.href}
//                                     initial={{ opacity: 0, x: 50 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: index * 0.1 }}
//                                 >
//                                     <Link href={item.href}>
//                                         <Button
//                                             variant={item.href === '/assess' ? 'default' : 'ghost'}
//                                             className={`w-full justify-start group ${
//                                                 item.href === '/assess'
//                                                     ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
//                                                     : ''
//                                             }`}
//                                         >
//                                             <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
//                                             {item.label}
//                                             {item.href === '/assess' && (
//                                                 <ChevronRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />
//                                             )}
//                                         </Button>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                         </nav>
//                     </SheetContent>
//                 </Sheet>
//             </div>
//         </motion.header>
//     )
// }


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Menu,
    Home,
    ClipboardCheck,
    Info,
    History,
    HelpCircle,
    ChevronRight
} from 'lucide-react'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigationItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/about', label: 'About', icon: Info },
        { href: '/history', label: 'History', icon: History },
        { href: '/resources', label: 'Resources', icon: HelpCircle },
        { href: '/assess', label: 'Assessment', icon: ClipboardCheck },
    ]

    if (!isMounted) return null

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-b shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container flex items-center justify-between h-16">
                {/*<Link href="/" className="relative group flex items-center gap-2">*/}
                {/*    <div className="relative w-16 h-16">*/}
                {/*        <Image*/}
                {/*            src="/friendscope-logo.svg"*/}
                {/*            alt="FriendScope Logo"*/}
                {/*            fill*/}
                {/*            className="object-contain"*/}
                {/*            priority*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <motion.div*/}
                {/*        initial={{ opacity: 0, x: -20 }}*/}
                {/*        animate={{ opacity: 1, x: 0 }}*/}
                {/*        className="flex items-center"*/}
                {/*    >*/}
                {/*        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">*/}
                {/*            FriendScope*/}
                {/*        </span>*/}
                {/*        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />*/}
                {/*    </motion.div>*/}
                {/*</Link>*/}

                <Link href="/" className="flex items-center gap-2">
                    {/* Logo - 不带动画效果 */}
                    <div className="relative w-16 h-16">
                        <Image
                            src="/friendscope-logo.svg"
                            alt="FriendScope Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* 标题 - 带动画效果 */}
                    <div className="relative group">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                        >
                            FriendScope
                        </motion.span>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
                    </div>
                </Link>


                {/* Desktop Navigation */}
                {/*<nav className="hidden md:flex items-center space-x-1">*/}
                {/*    <AnimatePresence mode="wait">*/}
                {/*        {navigationItems.map((item, index) => (*/}
                {/*            <motion.div*/}
                {/*                key={item.href}*/}
                {/*                initial={{ opacity: 0, y: -20 }}*/}
                {/*                animate={{ opacity: 1, y: 0 }}*/}
                {/*                transition={{ delay: index * 0.1 }}*/}
                {/*            >*/}
                {/*                <Link href={item.href}>*/}
                {/*                    <Button*/}
                {/*                        variant={item.href === '/assess' ? 'default' : 'ghost'}*/}
                {/*                        className={`group relative ${*/}
                {/*                            item.href === '/assess'*/}
                {/*                                ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'*/}
                {/*                                : ''*/}
                {/*                        }`}*/}
                {/*                    >*/}
                {/*                        <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />*/}
                {/*                        <span className="relative">*/}
                {/*                            {item.label}*/}
                {/*                            {item.href !== '/assess' && <WaveAnimation />}*/}
                {/*                        </span>*/}
                {/*                        {item.href === '/assess' && (*/}
                {/*                            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />*/}
                {/*                        )}*/}
                {/*                    </Button>*/}
                {/*                </Link>*/}
                {/*            </motion.div>*/}
                {/*        ))}*/}
                {/*    </AnimatePresence>*/}
                {/*</nav>*/}

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navigationItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={item.href}>
                                <Button
                                    variant={item.href === '/assess' ? 'default' : 'ghost'}
                                    className={`group relative ${
                                        item.href === '/assess'
                                            ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
                                            : ''
                                    }`}
                                >
                                    <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                    {item.href !== '/assess' ? (
                                        <div className="relative group/underline">
                                            <span>{item.label}</span>
                                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover/underline:w-full transition-all duration-300" />
                                        </div>
                                    ) : (
                                        <>
                                            <span>{item.label}</span>
                                            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </nav>


                {/* Mobile Navigation */}
                {/*<Sheet>*/}
                {/*    <SheetTrigger asChild>*/}
                {/*        <Button variant="outline" size="icon" className="md:hidden">*/}
                {/*            <Menu className="h-5 w-5" />*/}
                {/*            <span className="sr-only">Open menu</span>*/}
                {/*        </Button>*/}
                {/*    </SheetTrigger>*/}
                {/*    <SheetContent side="right" className="w-[300px] sm:w-[400px]">*/}
                {/*        <nav className="flex flex-col space-y-4 mt-8">*/}
                {/*            {navigationItems.map((item, index) => (*/}
                {/*                <motion.div*/}
                {/*                    key={item.href}*/}
                {/*                    initial={{ opacity: 0, x: 50 }}*/}
                {/*                    animate={{ opacity: 1, x: 0 }}*/}
                {/*                    transition={{ delay: index * 0.1 }}*/}
                {/*                >*/}
                {/*                    <Link href={item.href}>*/}
                {/*                        <Button*/}
                {/*                            variant={item.href === '/assess' ? 'default' : 'ghost'}*/}
                {/*                            className={`w-full justify-start group relative ${*/}
                {/*                                item.href === '/assess'*/}
                {/*                                    ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'*/}
                {/*                                    : ''*/}
                {/*                            }`}*/}
                {/*                        >*/}
                {/*                            <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />*/}
                {/*                            <span className="relative">*/}
                {/*                                {item.label}*/}
                {/*                                {item.href !== '/assess' && <WaveAnimation />}*/}
                {/*                            </span>*/}
                {/*                            {item.href === '/assess' && (*/}
                {/*                                <ChevronRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />*/}
                {/*                            )}*/}
                {/*                        </Button>*/}
                {/*                    </Link>*/}
                {/*                </motion.div>*/}
                {/*            ))}*/}
                {/*        </nav>*/}
                {/*    </SheetContent>*/}
                {/*</Sheet>*/}


                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col space-y-4 mt-8">
                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={item.href}>
                                        <Button
                                            variant={item.href === '/assess' ? 'default' : 'ghost'}
                                            className={`w-full justify-start group relative ${
                                                item.href === '/assess'
                                                    ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
                                                    : ''
                                            }`}
                                        >
                                            <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                            {item.href !== '/assess' ? (
                                                <div className="relative group/underline">
                                                    <span>{item.label}</span>
                                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover/underline:w-full transition-all duration-300" />
                                                </div>
                                            ) : (
                                                <>
                                                    <span>{item.label}</span>
                                                    <ChevronRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>


            </div>
        </motion.header>
    )
}

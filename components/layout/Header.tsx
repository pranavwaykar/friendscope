import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
    return (
        <header className="bg-background border-b">
            <div className="container flex items-center justify-between h-16">
                <Link href="/" className="text-2xl font-bold text-primary">
                    FriendScope
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/about">
                                <Button variant="ghost">About</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/assess">
                                <Button>Start Assessment</Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/about">
                                <Button variant="ghost" className="w-full justify-start">About</Button>
                            </Link>
                            <Link href="/assess">
                                <Button className="w-full justify-start">Start Assessment</Button>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

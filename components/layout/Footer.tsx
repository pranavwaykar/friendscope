export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} FriendScope. All rights reserved.
            </div>
        </footer>
    )
}

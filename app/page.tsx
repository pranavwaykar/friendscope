import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <section className="text-center mb-8 md:mb-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to FriendScope</h1>
                <p className="text-lg md:text-xl mb-6 md:mb-8">Evaluate your friendships through scientific questionnaires</p>
                <Link href="/assess">
                    <Button size="lg" className="w-full md:w-auto">Start Assessment</Button>
                </Link>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-16">
                {[
                    { title: 'Quick Start', description: 'Begin your assessment instantly - no registration required.' },
                    { title: 'Smart Questions', description: 'Answer concise, scientifically-backed questions about your friendship.' },
                    { title: 'Instant Insights', description: 'Receive immediate results with actionable recommendations.' },
                ].map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Why Use FriendScope?</h2>
                <ul className="list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
                    <li>Gain deeper insights into your friendships</li>
                    <li>Identify areas for improvement in your relationships</li>
                    <li>Celebrate the strengths of your connections</li>
                    <li>Receive personalized recommendations for nurturing friendships</li>
                </ul>
            </section>
        </div>
    )
}

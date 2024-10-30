import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-center">About FriendScope (友谱)</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>FriendScope (友谱) is dedicated to helping people understand and improve their friendships through scientific assessment and personalized insights. We believe that strong, healthy friendships are fundamental to personal well-being and happiness.</p>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Take our scientifically designed friendship assessment</li>
                        <li>Receive an overall friendship score</li>
                        <li>Get detailed insights into different aspects of your friendship</li>
                        <li>Receive personalized recommendations for improvement</li>
                    </ol>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your privacy is our top priority. All assessments are anonymous, and we do not store any personal information. Your responses are only used to generate your results and are not saved after you close the browser.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Scientific Basis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Our assessment is based on established psychological research on interpersonal relationships. We continuously update our questions and algorithms to reflect the latest findings in friendship and social psychology studies.</p>
                </CardContent>
            </Card>
        </div>
    )
}

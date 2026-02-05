/**
 * Greeting Page Component
 *
 * A centered card with a "Greet Me" button that displays
 * a time-appropriate greeting when clicked.
 */

import { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'
import { getGreeting } from '@/utils/greeting'

export function GreetingPage() {
  const [greeting, setGreeting] = useState<string | null>(null)

  const handleGreet = () => {
    setGreeting(getGreeting())
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
      <Card className="w-full max-w-md" data-testid="greeting.card">
        <CardHeader className="text-center">
          <CardTitle>Time-Based Greeting</CardTitle>
          <CardDescription>
            Click the button below to receive a greeting based on the current time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Button
            onClick={handleGreet}
            size="lg"
            data-testid="greeting.button"
          >
            Greet Me
          </Button>
          {greeting && (
            <div
              className="text-2xl font-medium text-[var(--color-fg)] text-center p-4 bg-[var(--color-bg)] rounded-[var(--radius-md)] border border-[var(--color-border)] w-full"
              data-testid="greeting.display"
            >
              {greeting}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center text-sm text-[var(--color-muted)]">
          {!greeting && 'Your greeting will appear here'}
        </CardFooter>
      </Card>
    </div>
  )
}

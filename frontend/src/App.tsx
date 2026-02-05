/**
 * Main App Component
 *
 * Pre-wrapped with DialogProvider to enable the useDialog hook throughout the app.
 * Add your routes, layout, and other providers here.
 */

import { DialogProvider } from '@/components/ui'
import { GreetingPage } from '@/pages/GreetingPage'

function App() {
  return (
    <DialogProvider>
      <GreetingPage />
    </DialogProvider>
  )
}

export default App

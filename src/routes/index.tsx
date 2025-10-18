import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <p>Shortcut Zone is actively being worked on. Please check back later.</p>
    </div>
  )
}

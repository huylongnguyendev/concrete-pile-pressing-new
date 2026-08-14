import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/message')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/message"!</div>
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/projects/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/projects/$projectId"!</div>
}

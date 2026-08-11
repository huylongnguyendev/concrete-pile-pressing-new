import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dich-vu')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dich-vu"!</div>
}

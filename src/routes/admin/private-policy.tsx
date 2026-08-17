import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/private-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='py-4 space-y-8'>Hello "/admin/private-policy"!</div>
}

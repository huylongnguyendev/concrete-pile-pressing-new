import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/customers/$customerId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/customers/$customerId/edit"!</div>
}

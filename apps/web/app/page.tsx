import { Sample } from '@ui/components/custom'
import { Button } from '@ui/components/ui/button'

export default function Home() {
  return (
    <div>
      <h1 className="text-9xl text-red-600 bg-test-700">
        Hello from Turbo App !!!
      </h1>
      <Button variant="destructive">Destructive</Button>
      <Sample />
    </div>
  )
}

import { Sample } from '@repo/ui/components/custom/Sample'
import { Button } from '@repo/ui/components/ui/button'

export default function Home() {
  return (
    <div>
      <h1 className="text-9xl text-red-600 bg-test-700">
        Hello from Turbo App
      </h1>
      <Button variant="destructive">Destructive</Button>
      <Sample />
    </div>
  )
}

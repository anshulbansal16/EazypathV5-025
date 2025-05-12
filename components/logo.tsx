import Link from "next/link"
import { Heart, Activity } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-20 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="h-5 w-5 text-blue-600 opacity-70" />
        </div>
      </div>
      <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
        Eazypaths
      </span>
    </Link>
  )
}

import { Link } from "wouter";

export function HomePage() {
  return (
    <div className="home w-screen h-screen text-xl text-white">
      <p>SCRAMBLE WORD</p>
      <Link href="/levels">
        <button>LEVELS</button>
      </Link>
    </div>
  )
}

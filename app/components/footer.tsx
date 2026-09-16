import { name } from "@/config"

export default function Footer() {
  return (
    <footer className="text-xs text-neutral-600 mt-8 mb-8">
      <p>
        © {new Date().getFullYear()} {name}
      </p>
    </footer>
  )
}

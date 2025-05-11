import { useState } from "react"
import { debounce } from "lodash"

export function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = debounce((term: string) => {
    onSearch(term)
  }, 300) // Débounce de 300ms

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    handleSearch(term)
  }

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Rechercher un médicament..."
      className="search-input"
    />
  )
}
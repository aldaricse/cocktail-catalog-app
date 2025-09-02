"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getSearchCoctails } from "@/lib/api/services/cocktailApiService"
import { AlphabeticalFilter } from "./alphabetical-filter"
import { CocktailCard } from "./cocktail-card"
import { Cocktail } from "@/types/cocktails"
import { pageArray } from "@/lib/utils"
import { Pagination } from "./pagination"

export function CocktailCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("A")
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([])
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)

  const paginationDefault = {
    data: [] as Cocktail[],
    page: 1,
    total: 0,
    totalPages: 0,
    hasPrev: false,
    hasNext: false
  }

  const elementsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(paginationDefault);

  const changePage = (page: number) => {
    setCurrentPage(page);
    const pageData = pageArray(cocktails, page, elementsPerPage);
    setPagination(pageData);
    setFilteredCocktails(pageData.data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleLetterSelect = (letter: string) => {
    fetchCocktailsForLetter(letter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const fetchCocktailsForLetter = async (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
    const { drinks: drinksData } = await getSearchCoctails({ f: letter });
    setCocktails(drinksData);
    const pageData = !!drinksData && drinksData.length > 0 ? pageArray(drinksData, currentPage, elementsPerPage) : paginationDefault;
    setPagination(pageData);
    setFilteredCocktails(pageData.data);
  }

  const fetchCocktailsForName = async (search: string) => {
    setCurrentPage(1);
    const { drinks: drinksData } = await getSearchCoctails({ s: search });
    setCocktails(drinksData);
    const pageData = !!drinksData && drinksData.length > 0 ? pageArray(drinksData, currentPage, elementsPerPage) : paginationDefault;
    setPagination(pageData);
    setFilteredCocktails(pageData.data);
  }

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (value.length === 0) {
        fetchCocktailsForLetter(selectedLetter);
      } else if (value.length >= 3) {
        fetchCocktailsForName(value);
      }
    }, 500);

    setSearchTimeout(timeout);
  }

  useEffect(() => {
    fetchCocktailsForLetter(selectedLetter);
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Catálogo de Cócteles</h1>
              <p className="text-muted-foreground text-pretty">
                Descubre recetas clásicas y modernas para crear los mejores cócteles
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar cócteles..."
                value={searchTerm}
                onChange={handleChangeSearch}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cocktail Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {
          filteredCocktails.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron cócteles que coincidan con tu búsqueda.</p>
            </div>) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCocktails.map((cocktail) => (
                <CocktailCard
                  key={cocktail.idDrink}
                  cocktail={cocktail}
                  setSelectedCocktail={setSelectedCocktail}
                />
              ))}
            </div>
          )
        }

        <Pagination
          pagination={pagination}
          onPageChange={changePage}
        />
      </div>
      <hr />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AlphabeticalFilter
          selected={selectedLetter}
          onSelect={handleLetterSelect}
        />
      </div>
    </div>
  )
}

export interface CocktailFilters {
  s?: string; // Search by name
  f?: string; // Search by first letter
}

interface Cocktail {
  idDrink: number
  strDrink: string
  strCategory: string
  strDrinkThumb: string
}
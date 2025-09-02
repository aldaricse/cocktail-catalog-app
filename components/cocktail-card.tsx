import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Cocktail } from "@/types/cocktails"

interface CocktailCardProps {
  cocktail: Cocktail;
  setSelectedCocktail: (cocktail: CocktailCardProps["cocktail"]) => void
}

export const CocktailCard = ({
  cocktail,
  setSelectedCocktail
}: CocktailCardProps) => {
  return (
    <Card
      key={cocktail.idDrink}
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={() => setSelectedCocktail(cocktail)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={cocktail.strDrinkThumb || "/placeholder.svg"}
            alt={cocktail.strDrink}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/20 dark:bg-background/90">
              {cocktail.strCategory}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div>
            <h3 className="font-semibold text-lg text-foreground text-balance">{cocktail.strDrink}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
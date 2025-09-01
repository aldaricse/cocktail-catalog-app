"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Clock, Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Cocktail {
  id: number
  name: string
  image: string
  category: string
  difficulty: "Fácil" | "Medio" | "Difícil"
  time: string
  servings: number
  ingredients: string[]
  instructions: string[]
  description: string
}

const cocktails: Cocktail[] = [
  {
    id: 1,
    name: "Mojito Clásico",
    image: "/mojito-cocktail-with-mint-leaves-and-lime.png",
    category: "Clásicos",
    difficulty: "Fácil",
    time: "5 min",
    servings: 1,
    ingredients: [
      "60ml Ron blanco",
      "30ml Jugo de lima fresco",
      "2 cucharaditas Azúcar",
      "8-10 Hojas de menta fresca",
      "Agua con gas",
      "Hielo",
    ],
    instructions: [
      "Coloca las hojas de menta y el azúcar en un vaso alto",
      "Machaca suavemente la menta para liberar los aceites",
      "Agrega el jugo de lima y mezcla bien",
      "Llena el vaso con hielo",
      "Vierte el ron y completa con agua con gas",
      "Revuelve suavemente y decora con menta fresca",
    ],
    description: "Un refrescante cóctel cubano perfecto para días calurosos.",
  },
  {
    id: 2,
    name: "Margarita",
    image: "/margarita-cocktail-with-salt-rim-and-lime.png",
    category: "Clásicos",
    difficulty: "Medio",
    time: "7 min",
    servings: 1,
    ingredients: [
      "60ml Tequila blanco",
      "30ml Triple sec",
      "30ml Jugo de lima fresco",
      "15ml Jarabe simple",
      "Sal para el borde",
      "Hielo",
    ],
    instructions: [
      "Humedece el borde del vaso con lima y pásalo por sal",
      "En una coctelera, combina tequila, triple sec, jugo de lima y jarabe",
      "Agrega hielo y agita vigorosamente por 15 segundos",
      "Cuela en el vaso preparado con hielo fresco",
      "Decora con una rodaja de lima",
    ],
    description: "El cóctel mexicano más famoso del mundo, equilibrio perfecto entre dulce y ácido.",
  },
  {
    id: 3,
    name: "Old Fashioned",
    image: "/old-fashioned-cocktail-with-orange-peel-and-cherry.png",
    category: "Clásicos",
    difficulty: "Medio",
    time: "8 min",
    servings: 1,
    ingredients: [
      "60ml Whiskey bourbon",
      "1 Terrón de azúcar",
      "2-3 Gotas de angostura",
      "Cáscara de naranja",
      "Cereza marrasquino",
      "Hielo",
    ],
    instructions: [
      "En un vaso old fashioned, coloca el terrón de azúcar",
      "Agrega las gotas de angostura y un poco de agua",
      "Machaca el azúcar hasta disolverlo",
      "Agrega el whiskey y hielo",
      "Revuelve suavemente",
      "Exprime la cáscara de naranja sobre el cóctel y úsala de decoración junto con la cereza",
    ],
    description: "Un clásico atemporal que resalta la calidad del whiskey con toques aromáticos.",
  },
  {
    id: 4,
    name: "Cosmopolitan",
    image: "/cosmopolitan-cocktail-pink-color-in-martini-glass.png",
    category: "Modernos",
    difficulty: "Medio",
    time: "6 min",
    servings: 1,
    ingredients: [
      "45ml Vodka",
      "15ml Triple sec",
      "30ml Jugo de arándano",
      "15ml Jugo de lima fresco",
      "Cáscara de lima",
      "Hielo",
    ],
    instructions: [
      "En una coctelera, combina vodka, triple sec, jugo de arándano y lima",
      "Agrega hielo y agita vigorosamente",
      "Cuela en una copa de martini fría",
      "Decora con una espiral de cáscara de lima",
    ],
    description: "Elegante y sofisticado, popularizado en los años 90 con su distintivo color rosado.",
  },
  {
    id: 5,
    name: "Negroni",
    image: "/negroni-cocktail-red-color-with-orange-slice.png",
    category: "Clásicos",
    difficulty: "Fácil",
    time: "4 min",
    servings: 1,
    ingredients: ["30ml Gin", "30ml Campari", "30ml Vermouth rojo dulce", "Rodaja de naranja", "Hielo"],
    instructions: [
      "En un vaso old fashioned con hielo, vierte el gin",
      "Agrega el Campari y el vermouth",
      "Revuelve suavemente",
      "Decora con una rodaja de naranja",
    ],
    description: "Un aperitivo italiano amargo y aromático, perfecto equilibrio de sabores intensos.",
  },
  {
    id: 6,
    name: "Piña Colada",
    image: "/pina-colada-cocktail-with-pineapple-and-coconut.png",
    category: "Tropicales",
    difficulty: "Fácil",
    time: "5 min",
    servings: 1,
    ingredients: [
      "60ml Ron blanco",
      "90ml Jugo de piña",
      "30ml Crema de coco",
      "1 taza Hielo picado",
      "Rodaja de piña",
      "Cereza marrasquino",
    ],
    instructions: [
      "En una licuadora, combina ron, jugo de piña y crema de coco",
      "Agrega el hielo picado",
      "Licúa hasta obtener consistencia cremosa",
      "Sirve en un vaso huracán",
      "Decora con piña y cereza",
    ],
    description: "El sabor del Caribe en un vaso, cremoso y tropical para transportarte a la playa.",
  },
]

const categories = ["Todos", "Clásicos", "Modernos", "Tropicales"]

export function CocktailCatalog() {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredCocktails = cocktails.filter((cocktail) => {
    const matchesSearch =
      cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cocktail.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "Todos" || cocktail.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (selectedCocktail) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setSelectedCocktail(null)} className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al catálogo
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <img
                src={selectedCocktail.image || "/placeholder.svg"}
                alt={selectedCocktail.name}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedCocktail.time}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedCocktail.servings} persona{selectedCocktail.servings > 1 ? "s" : ""}
                </div>
                <Badge
                  variant={
                    selectedCocktail.difficulty === "Fácil"
                      ? "secondary"
                      : selectedCocktail.difficulty === "Medio"
                        ? "default"
                        : "destructive"
                  }
                >
                  {selectedCocktail.difficulty}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{selectedCocktail.name}</h1>
                <p className="text-muted-foreground text-pretty">{selectedCocktail.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Ingredientes</h2>
                <ul className="space-y-2">
                  {selectedCocktail.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Preparación</h2>
                <ol className="space-y-3">
                  {selectedCocktail.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-foreground text-pretty">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar cócteles o ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cocktail Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredCocktails.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No se encontraron cócteles que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCocktails.map((cocktail) => (
              <Card
                key={cocktail.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedCocktail(cocktail)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={cocktail.image || "/placeholder.svg"}
                      alt={cocktail.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-background/90">
                        {cocktail.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground text-balance">{cocktail.name}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{cocktail.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {cocktail.time}
                      </div>
                      <Badge
                        variant={
                          cocktail.difficulty === "Fácil"
                            ? "secondary"
                            : cocktail.difficulty === "Medio"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {cocktail.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

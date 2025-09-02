import { useState } from "react";
import { Button } from "./ui/button";

interface AlphabeticalFilterProps {
  selected: string;
  onSelect: (letter: string) => void
}

export const AlphabeticalFilter = ({
  selected,
  onSelect
}: AlphabeticalFilterProps) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-sm font-medium text-muted-foreground">Filtrar por letra:</p>
      <div className="flex gap-1 flex-wrap">
        {letters.map((letter) => (
          <Button
            key={letter}
            variant={selected === letter ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(letter)}
            className="size-6 lg:size-8 cursor-pointer"
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  )
}
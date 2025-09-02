import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export const pageArray = (data: any[] = [], currentPage: number, elementsPerPage: number) => {
  const indiceInicio = (currentPage - 1) * elementsPerPage;
  const indiceFin = indiceInicio + elementsPerPage;

  return {
    data: data.slice(indiceInicio, indiceFin),
    page: currentPage,
    total: data.length,
    totalPages: Math.ceil(data.length / elementsPerPage),
    hasPrev: currentPage > 1,
    hasNext: currentPage < Math.ceil(data.length / elementsPerPage)
  };
}
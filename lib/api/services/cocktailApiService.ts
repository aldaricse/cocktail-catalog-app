import { buildQueryString } from '@/lib/utils';
import { axiosPrivate } from '../base';
import { CocktailFilters } from '@/types/cocktails';

export const getSearchCoctails = async (filters: CocktailFilters = {}) => {
  const queryString = buildQueryString(filters);
  const result = await axiosPrivate.get(`/search.php${queryString}`);
  return result.data;
}
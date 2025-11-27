import { type FunctionComponent } from 'react';
import { Expander } from './Expander';
import {type SearchByImageIdProps, SearchByImageId } from '../search-by-image-id';

export const SearchByImageIdExpander: FunctionComponent<SearchByImageIdProps> = ({
  onSearch,
}: SearchByImageIdProps) => {
  return (
    <Expander
      items={[{
        id: 'search-by-image-id',
        header: 'חיפוש לפי מזהה תמונה',
        content: (<SearchByImageId 
            onSearch={onSearch}
        />)
      }]}
    />);
};
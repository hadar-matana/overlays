import { type FunctionComponent } from 'react';
import { Expander } from '../atlas-base/basic/expander';
import { type SearchByImageIdProps, SearchByImageId } from '../atlas-base/image/search-by-image-id';

export const SearchByImageIdFilter: FunctionComponent<SearchByImageIdProps> = ({
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


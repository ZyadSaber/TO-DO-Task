import { createContext } from 'react';
import { ColumnsType } from '../components/Interface';


export const ColumnData = createContext<ColumnsType>({
  listData: [],
  search: '',
  setListData: () => {},
  setLocalStorageSaveCHK: () => {},
});
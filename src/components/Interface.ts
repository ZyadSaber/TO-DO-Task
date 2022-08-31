export interface cardType {
    ID: number;
    title: string;
    body: string;
    date: number;
    columnType: string;
    personName: string;
}
export interface inputTextType {
    target:{value: string}
}
export interface formButtonType {
    preventDefault: () => void; 
};
export type booleanFunctionType = (value: boolean) => void
export interface ColumnsType {
  listData: cardType[];
  search: string;
  setLocalStorageSaveCHK: booleanFunctionType
  setListData: (key: cardType[]) => void;
}
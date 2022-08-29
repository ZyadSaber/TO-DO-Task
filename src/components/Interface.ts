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
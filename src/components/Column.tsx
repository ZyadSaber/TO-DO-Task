import { memo, useState, useCallback} from "react";
import AddCard from './AddCard'
import EditCard from './EditCard'

interface card {
  ID: number;
  title: string;
  body: string;
  date: number;
  columnType: string;
  personName: string;
}
interface  ColumnsPropsType {
  listData: card[];
  filter: string;
  search: string;
  setLocalStorageSaveCHK: (value: boolean | ((preVal: boolean) => boolean)) => void;
  setListData: (key: card[]) => void;
}

const Column = ({listData, filter, search, setListData, setLocalStorageSaveCHK}: ColumnsPropsType) => {

    const [add, setAdd] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [card, setCard] = useState<card>(
    {
    ID: 0,
    title: "",
    body: "",
    date: 0,
    columnType: "Default",
    personName: "",
  });
  const onUpdateCards = (updatedCard:card) => {
    const updatedCards:card[] = listData.map((card:card) => {
          if (card.ID === updatedCard.ID)return updatedCard;
          return card;
        });
        setListData(updatedCards)};
        
        const handleDelete = useCallback((cardDate: number) => ()=>{
          setListData(listData.filter((currentCard: {ID: number}) => currentCard.ID !== cardDate));
           setLocalStorageSaveCHK(true)
          }, [listData, setListData, setLocalStorageSaveCHK]);

        const handleEdit = useCallback((item: card)=>()=>{
          setEdit(true);
          setCard(item);
        },[]);

        const onAddCard = (newCard: card) => {
          setListData([...listData, newCard])
        }
        
        const addButton = useCallback(()=>() => {setAdd(true)},[]);

    return (
        <div className="column">
            <div className="column_head">
                <h3>{filter}</h3>
                <button onClick={addButton()}>Add</button>
            </div>
            {add && <AddCard filter={filter} onAddCard={onAddCard} listData={listData} setAdd={setAdd}  setLocalStorageSaveCHK={setLocalStorageSaveCHK}/>}
            {edit && <EditCard card={card} onUpdateCards={onUpdateCards} setEdit={setEdit}  setLocalStorageSaveCHK={setLocalStorageSaveCHK}/>}
            <div className="cardSide">
               {listData.filter((currentCard) => {
          if (search==="" && currentCard.columnType === filter){
            return currentCard;
        } else if (currentCard.title.toLocaleLowerCase().includes(search.toLowerCase()) && currentCard.columnType === filter){
          return currentCard;
        }else if (currentCard.body.toLocaleLowerCase().includes(search.toLowerCase()) && currentCard.columnType === filter){
          return currentCard;
        }}).map((currentCard) => {
          return(
            <div className="card" key={currentCard.ID}>
                <div className="cardTitle">
                <strong>{currentCard.title}</strong>
                <div className="btn">
                <button onClick={handleEdit(currentCard)}>Edit</button>
                <button onClick={handleDelete(currentCard.ID)}>Delete</button></div>
                </div>
                <p>{currentCard.body}</p>
                <div className="lower">
                  <small>Last Modified {new Date(currentCard.date).toLocaleDateString("en-GB",{hour: "2-digit",minute: "2-digit",})}</small>
                  <small>{currentCard.personName}</small>
                </div>
            </div>
          )
        })}
            </div>

        </div>
    )
}

export default memo(Column)
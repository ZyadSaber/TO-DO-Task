import {memo, useCallback, useState} from 'react';
import {inputTextType, formButtonType, cardType} from './Interface'

 interface  EditCardType {
    card: cardType;
    onUpdateCards: (obj: cardType) => void;
    setEdit:   (value: boolean | ((preVal: boolean) => boolean)) => void;
    setLocalStorageSaveCHK: (value: boolean | ((preVal: boolean) => boolean)) => void;
};

const EditCard = ({card,  onUpdateCards, setEdit, setLocalStorageSaveCHK}:EditCardType) => {
    const [editCard, setEditCard] = useState({
           "ID": +card.ID,
           "title": card.title,
           "body": card.body,
           "date": Date.now(),   
           "columnType": card.columnType,
           "personName": card.personName,
       });

    const changeTitle =useCallback((event:inputTextType) => {setEditCard({...editCard, "title":event.target.value})},[editCard]);
    const changeBody = useCallback((event: inputTextType) => {setEditCard({...editCard, "body": event.target.value})},[editCard]);
    const changePersonName = useCallback((event: inputTextType) => {setEditCard({...editCard, "personName": event.target.value})},[editCard]);
    const changeColumnType = useCallback((event: inputTextType) => {setEditCard({...editCard, "columnType": event.target.value})},[editCard]);



     const postData=useCallback((btn: formButtonType)=>{
        btn.preventDefault();
        setLocalStorageSaveCHK(true);
        setEdit(false);
        onUpdateCards(editCard);
    },[editCard, onUpdateCards, setEdit, setLocalStorageSaveCHK]);

    const closeWindow = useCallback(() => {setEdit(false)}, [setEdit]);

    return (
        <div className="create">
            <form onSubmit={postData}>
                <label>Blog title:</label>
                <input
                type="text"
                required
                value={editCard.title}
                onChange={changeTitle}
                placeholder="Write your Task title"
                />
                <label>Blog body:</label>
                <textarea 
                required
                value={editCard.body}
                onChange={changeBody}
                placeholder="write your Task body"
                />
                <label>Author Name:</label>
                <input
                type="text"
                required
                value={editCard.personName}
                onChange={changePersonName}
                placeholder="Write your Task Name"
                />
                <select  onChange={changeColumnType} value={editCard.columnType}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Done">Done</option>
                </select>
                <button>Update Task</button>
            </form>
            <button onClick={closeWindow}>Cancel</button>
        </div>
    )
}

export default memo(EditCard)
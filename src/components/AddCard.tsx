import {memo, useCallback, useState} from 'react';

interface  AddCardType {
    filter: string;
    listData: {
    ID: number;
    title: string;
    body: string;
    date: number;
    columnType: string;
    personName: string;
  }[];
  setAdd: (value: boolean | ((preVal: boolean) => boolean)) => void;
  setLocalStorageSaveCHK: (value: boolean | ((preVal: boolean) => boolean)) => void;
  onAddCard: (obj: {
    ID: number;
    title: string;
    body: string;
    date: number;
    columnType: string;
    personName: string;
  }) => void;
}

const AddCard = ({filter, listData, setAdd, onAddCard, setLocalStorageSaveCHK }:AddCardType) => {

    const [title, setTitle,] = useState('');
    const [body, setBody] = useState('');
    const [personName , setPersonName] = useState('');
    const changeTitle =useCallback((event: {target:{value: string}}) => {setTitle(event.target.value)},[setTitle]);
    const changeBody = useCallback((event: {target:{value: string}}) => {setBody(event.target.value)},[setBody]);
    const changePersonName = useCallback((event: {target:{value: string}}) => {setPersonName(event.target.value)},[setPersonName]);

     const postData=useCallback((btn: { preventDefault: () => void; })=>{
        btn.preventDefault()
        const newCard = {
            ID: listData.length+1,
            "title": title,
            "body": body,
            date: Date.now(),
            "columnType": filter,
            "personName": personName,
        }
        setAdd(false)
        setLocalStorageSaveCHK(true)
        onAddCard(newCard)
    },[body, filter, listData.length, onAddCard, personName, setAdd, setLocalStorageSaveCHK, title]);

    const close = useCallback(() => () => {setAdd(false)}, [setAdd]);

    return (
        <div className="create">
            <form onSubmit={postData}>
                <label>Blog title:</label>
                <input
                type="text"
                required
                value={title}
                onChange={changeTitle}
                placeholder="Write your Task title"
                />
                <label>Blog body:</label>
                <textarea 
                required
                value={body}
                onChange={changeBody}
                placeholder="write your Task body"
                />
                <label>Author Name:</label>
                <input
                type="text"
                required
                value={personName}
                onChange={changePersonName}
                placeholder="Write your Task Name"
                />
                <button>Add Task</button>
            </form>
            <button onClick={close()}>Cancel</button>
        </div>
    )
}

export default memo(AddCard)
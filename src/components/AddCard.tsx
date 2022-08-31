import { memo, useCallback, useState } from 'react';
import { cardType, inputTextType, formButtonType, booleanFunctionType } from './Interface'

interface AddCardType {
    filter: string;
    listData: cardType[];
    setAdd: booleanFunctionType;
    setLocalStorageSaveCHK: booleanFunctionType;
    onAddCard: (obj: cardType) => void;
}

const AddCard = ({ filter, listData, setAdd, onAddCard, setLocalStorageSaveCHK }: AddCardType) => {
    const [newCard, setNewCard] = useState({
        ID: listData.length + 1,
        title: "",
        body: "",
        date: Date.now(),
        columnType: filter,
        personName: "",
    })
    const changeTitle = useCallback((event: inputTextType) => setNewCard({ ...newCard, title: event.target.value }), [newCard]);
    const changeBody = useCallback((event: inputTextType) => setNewCard({ ...newCard, body: event.target.value }), [newCard]);
    const changePersonName = useCallback((event: inputTextType) => setNewCard({ ...newCard, personName: event.target.value }), [newCard]);

    const postData = useCallback((btn: formButtonType) => {
        btn.preventDefault()
        setAdd(false)
        setLocalStorageSaveCHK(true)
        onAddCard(newCard)
    }, [newCard, onAddCard, setAdd, setLocalStorageSaveCHK]);

    const closeWindow = useCallback(() => setAdd(false), [setAdd]);

    return (
        <div className="create">
            <form onSubmit={postData}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={newCard.title}
                    onChange={changeTitle}
                    placeholder="Write your Task title"
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={newCard.body}
                    onChange={changeBody}
                    placeholder="write your Task body"
                />
                <label>Author Name:</label>
                <input
                    type="text"
                    required
                    value={newCard.personName}
                    onChange={changePersonName}
                    placeholder="Write your Task Name"
                />
                <button>Add Task</button>
            </form>
            <button onClick={closeWindow}>Cancel</button>
        </div>
    )
}

export default memo(AddCard)
import { useState } from 'react';

const Item = ({ item, handleEdit, handleDelete, handleSetComplete }) => {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(item.content)

    //define the jsx to be shown when editing a todo item 
    const edit = <>
        <p className="edit-header">Edit:</p>
        <input className="edit-text add-item-textbox" type="text" value={text} onChange={(e) => { setText(e.target.value) }} />
        <div className="todo-item__button-container">
            <button className="edit-save-button edit__button button-press"
                onClick={() => {
                    handleEdit(item.id, text);
                    setEditing(false);
                }}>Save</button>
            <button className="edit-cancel-button edit__button button-press"
                onClick={() => {
                    setEditing(false);
                    setText(item.content)
                }}>cancel</button>
        </div>
    </>
    //give todo items that are marked as complete a "complete" class
    let classs = item.completed == 1 ? " complete" : "";

    //convert unix time stamp to data to display the date the item was created 
    const date = new Date(item.created_at)
    const creationDate = `${date.getUTCDate()}-${date.getMonth()}-${date.getFullYear()}`

    //define the jsx for displaying a todo list item
    const show = <>
        <p className="created-at">{creationDate}</p>
        <p className={"todo-item__content " + classs} >{item.content}</p>

        <div className="todo-item__button-container">
            <button className="complete-Button item-button button-press" onClick={() => handleSetComplete(item.id)}>{item.completed ? <i className="fas fa-times-circle"></i> : <i className="fas fa-check-circle"></i>} </button>
            <div className="edit-delete-container">
                <button className="edit-button item-button button-press" onClick={() => setEditing(true)}><i className="fas fa-edit"></i></button>
                <button className="delete-button item-button button-press" onClick={() => handleDelete(item.id)}><i className="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </>

    return (
        <div className="todo-item" >
            {editing ? edit : show}
        </div>
    )
}

export default Item;
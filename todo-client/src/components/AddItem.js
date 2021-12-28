import { useState } from 'react';
const AddItem = ({ handleCreateItem }) => {

    const [contentText, setContentText] = useState("");
    const [validationError, setValidationError] = useState("");

    const handleTextchange = (event) => {
        let text = event.target.value;
        setContentText(text);
    }

    const handleItemAdd = () => {
        if (contentText.length === 0) {
            setValidationError("Item Content Must Not Be Empty");
            return;
        }
        setValidationError("");
        handleCreateItem(contentText);

        setContentText("");
    }

    let error = validationError ? <p className="validation-error">{validationError}</p> : "";
    return (
        <div className="add-item-container">
            <p className="add-item-heading">Create Todo Item:</p>
            <div className="add-item">
                <input className="add-item-textbox" type="text" value={contentText} onChange={handleTextchange} />
                <button className="add-item-button button-press" onClick={handleItemAdd}>Add</button>
            </div>
            {error}
        </div>
    )
}



export default AddItem; 
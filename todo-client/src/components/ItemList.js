import Item from './Item.js'

const ItemList = ({ todoList, error, isLoading, handleDelete, handleEdit, handleSetComplete }) => {

    //define jsx to display in the event of an error
    if (error) {
        return (
            <div className="todo-list">
                <h3>{error}</h3>
                <a className="error-return button-press" href="/">Refresh Page</a>
            </div>
        )
    }

    //define the jsx to display when the app is in loading state (currently unimplemented)
    if (isLoading) {
        return (
            <div className="todo-list">
                <h3>Loading</h3>
            </div>
        )
    }

    //define the jsx to display if the tod0 list is empty or undefined
    if (todoList === undefined || todoList.length === 0) {
        return (
            <div className="todo-list">
                <h4>you have no current tasks</h4>
            </div>
        )
    }

    //define the jsx to display the todo item list, sorting to show the newest created items first 
    return (
        <div className="todo-list">
            {todoList.sort((a, b) => { return b.created_at - a.created_at }).map((item) => {
                return <Item key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleSetComplete={handleSetComplete} />
            })}
        </div>
    )
}

export default ItemList; 
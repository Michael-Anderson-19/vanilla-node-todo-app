import { getAllItems, deleteItem, setComplete, addTodoItem, updateItem } from './utilities/requests.js'
import { useState, useEffect } from 'react';
import ItemList from './components/ItemList.js'
import AddItem from './components/AddItem.js'
import Header from './components/Header.js'
function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [error, setError] = useState("");

  const getItems = async () => {
    const data = await getAllItems();
    setTodoItems(data.data);
  }

  //load the todo items as soon as the page loads 
  useEffect(getItems, []);

  const handleItemAdd = async (content) => {
    if (await addTodoItem(content)) {
      getItems();
      return;
    }
    setError("An error occurred when attempting to add new todo item")
    return;
  }

  const handleItemDelete = async (id) => {
    if (await deleteItem(id)) {
      getItems();
      return;
    }
    setError("An error occurred when attempting to delete the todo item")
    return;
  }

  const handleItemUpdate = async (id, content) => {
    if (await updateItem(id, content)) {
      getItems();
      return
    }
    setError("An error occurred when attempting to update the todo item")
    return;
  }

  const handleSetComplete = async (id) => {
    if (await setComplete(id)) {
      getItems();
      return;
    }
    setError("An error occured when attempting to update the todo item");
    return;
  }

  let theme = darkMode ? "dark-mode" : "";

  return (
    <div className={`App ${theme}`} >
      <div className="top-banner">
        <Header setTheme={setDarkMode} />
      </div>
      <button onClick={getItems}>Get items</button>
      <AddItem handleCreateItem={handleItemAdd} />
      <ItemList error={error} todoList={todoItems} isLoading={0} handleDelete={handleItemDelete} handleEdit={handleItemUpdate} handleSetComplete={handleSetComplete} handleEdit={handleItemUpdate} />
    </div>
  );
}

export default App;

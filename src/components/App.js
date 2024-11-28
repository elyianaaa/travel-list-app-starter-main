import React, { useState } from "react";
import Logo from './Logo.js'
import Form from './Form.js'
import PackingList from './PackingList.js'
import Stats from './Stats.js'

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function togglePackedStatus(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  function handleClearItems() {
    setItems([]);
  }

  let filteredItems = items.filter((item) => {
    if (filter === "packed") return item.packed;
    if (filter === "unpacked") return !item.packed;
    return true;
  });

  filteredItems = filteredItems.sort((notPacked, packed) => {
    if (notPacked.packed === packed.packed) return 0; 
    return notPacked.packed ? 1 : -1;
  });

  return (
    <div className="app">
      <Logo />
      <Form
        handleAddItems={handleAddItems}
        setFilter={setFilter}
        filter={filter}
        handleClearItems={handleClearItems} 
      />
      <PackingList
        items={filteredItems}
        togglePackedStatus={togglePackedStatus}
        handleDeleteItem={handleDeleteItem}
      />
      <Stats items={filteredItems} />
    </div>
  );
}

export default App;

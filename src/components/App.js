import React, { useState } from "react";

function Logo() {
  return <h1>My Travel List ✈️</h1>;
}

function Form({ handleAddItems, setFilter, filter, setItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    handleAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select name="selectList" id="selectList" value={quantity} onChange={handleQuantityChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <div className="phone">
        <input id="phone-input" placeholder="Item..." value={description} onChange={handleDescriptionChange} />
      </div>
      <button>Add</button>
      <button type="button" onClick={() => setItems([])}>Clear List</button>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} // Update the filter state on selection change
      >
        <option value="all">All Items</option>
        <option value="packed">Packed</option>
        <option value="unpacked">Unpacked</option>
      </select>
    </form>
  );
}

function Item({ item, togglePackedStatus, handleDeleteItem }) {
  return (
    <li>
      <li
      style={{
        textDecoration: item.packed ? "line-through" : "",
      }}
    >
      {item.description} ({item.quantity})
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => togglePackedStatus(item.id)}
      />
    </li>
    <li>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
    </li>
    
  );
}

function PackingList({ items, togglePackedStatus, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} togglePackedStatus={togglePackedStatus} handleDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const packedPercentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "Everything has been packed!"
          : `You already packed ${packedItems} out of ${totalItems} items (${packedPercentage}%).`}
      </em>
    </footer>
  );
}

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

  // Filter items based on the selected filter
  const filteredItems = items.filter((item) => {
    if (filter === "packed") return item.packed;
    if (filter === "unpacked") return !item.packed;
    return true;
  });

  return (
    <div className="app">
      <Logo />
      <Form
        handleAddItems={handleAddItems}
        setFilter={setFilter}
        filter={filter}
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


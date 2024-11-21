import React, { useState } from "react";

// Initial packing items
// const initialItems = [
//   { id: 1, description: "Shirt", quantity: 5, packed: false },
//   { id: 2, description: "Pants", quantity: 2, packed: true },
// ];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form( { handleAddItems}) {
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

    handleAddItems(newItem)

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
        <option value="2">3</option>
      </select>
      <div className="phone">
        <input id="phone-input" placeholder="Item..." value={description} onChange={handleDescriptionChange} />
      </div>
      <button>Add</button>
    </form>
  );
}

function Item({ item, togglePackedStatus }) {
  return (
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
  );
}


function PackingList( { items, togglePackedStatus }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} togglePackedStatus={togglePackedStatus} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function togglePackedStatus(itemId) {
    setItems((prevItems) => 
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} togglePackedStatus={togglePackedStatus} />
      <Stats />
    </div>
  );
}

export default App;

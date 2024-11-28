import React, { useState } from "react";

export default function Form({ handleAddItems, setFilter, filter, handleClearItems }) {
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
      <button type="button" onClick={handleClearItems}>Clear List</button>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} 
      >
        <option value="all">All Items</option>
        <option value="packed">Packed</option>
        <option value="unpacked">Unpacked</option>
      </select>
    </form>
  );
}
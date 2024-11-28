  export default function Item({ item, togglePackedStatus, handleDeleteItem }) {
    return (
      <li>
        <span
          style={{
            textDecoration: item.packed ? "line-through" : "",
          }}
        >
          {item.description} ({item.quantity})
        </span>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => togglePackedStatus(item.id)}
        />
        <button onClick={() => handleDeleteItem(item.id)}>❌</button>
      </li>
    );
  }
  
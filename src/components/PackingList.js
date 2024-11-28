import Item from './Item';

export default function PackingList({ items, togglePackedStatus, handleDeleteItem }) {
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
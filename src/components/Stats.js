export default function Stats({ items }) {
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
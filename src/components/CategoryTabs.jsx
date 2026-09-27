'use client'

export default function CategoryTabs({ categories, current, onSelect }){
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat}
          className={cat === current ? 'cat-btn active' : 'cat-btn'}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

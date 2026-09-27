'use client'

import { useState } from 'react'

export default function GrammarCard({ num, item }){
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? 'grammar-card open' : 'grammar-card'} onClick={() => setOpen(o => !o)}>
      <div className="grammar-card-head">
        <h3><span className="grammar-num">{num}</span>{item.title}</h3>
        <span className="grammar-toggle">＋</span>
      </div>
      <div className="grammar-body">
        <div className="grammar-tip">💡 {item.tip}</div>
        <div className="grammar-example"><b>EX.</b> {item.example}</div>
        <div className="grammar-example-kr">{item.exampleKr}</div>
      </div>
    </div>
  );
}

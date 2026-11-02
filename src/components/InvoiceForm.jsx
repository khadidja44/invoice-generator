import React, { useState } from 'react';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';

// Liste des produits à sélectionner (adapte-la à tes produits)
const PRODUCTS = [
  { id: 1, name: 'Pizza Margherita', price: 800 },
  { id: 2, name: 'Burger Maison', price: 650 },
  { id: 3, name: 'Salade César', price: 500 },
  { id: 4, name: 'Boisson', price: 150 },
];

export default function InvoiceForm({ items, setItems, products = PRODUCTS }) {
  const [newItem, setNewItem] = useState({ productId: '', description: '', quantity: 1, price: 0 });

  const handleSelectProduct = (e) => {
    const product = products.find(p => p.id === Number(e.target.value));
    if (product) {
      setNewItem({ ...newItem, productId: product.id, description: product.name, price: product.price });
    } else {
      setNewItem({ ...newItem, productId: '', description: '', price: 0 });
    }
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.price >= 0 && newItem.quantity > 0) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ productId: '', description: '', quantity: 1, price: 0 });
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <ShoppingCart size={24} color="var(--primary-color)" />
        Lignes de Facturation
      </h2>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr auto', alignItems: 'end', marginBottom: '1.5rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Produit</label>
          <select
            className="form-control"
            value={newItem.productId}
            onChange={handleSelectProduct}
          >
            <option value="">-- Sélectionner un produit --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.price} DZD)
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Qté</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={newItem.quantity}
            onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Prix (DZD)</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddItem} style={{ height: '46px' }}>
          <Plus size={20} />
        </button>
      </div>

      {items.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Qté</th>
                <th>Prix U.</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{(item.quantity * item.price).toFixed(2)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          Aucun article ajouté à la facture.
        </p>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import ClientForm from './components/ClientForm';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { FileSignature } from 'lucide-react';

function App() {
  const [clientData, setClientData] = useState({
    id: '',
    name: '',
    email: '',
    address: ''
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!clientData.id) {
      const randomNums = Math.floor(100000 + Math.random() * 900000);
      setClientData(prev => ({ ...prev, id: `CL${randomNums}DZ` }));
    }
  }, []);

  return (
    <div className="container">
      <header className="header">
        <FileSignature size={56} color="var(--primary-color)" style={{ marginBottom: '1.5rem', display: 'inline-block' }} />
        <h1>Générateur de Factures</h1>
        <p>Gérez vos clients, ajoutez des articles et générez des PDF avec QR Code instantanément.</p>
      </header>

      <div className="grid">
        <ClientForm clientData={clientData} setClientData={setClientData} />
        <InvoiceForm items={items} setItems={setItems} />
      </div>

      <InvoicePreview clientData={clientData} items={items} />
    </div>
  );
}

export default App;

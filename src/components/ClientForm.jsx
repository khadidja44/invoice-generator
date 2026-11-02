import React from 'react';
import { User, MapPin, Phone, Mail } from 'lucide-react';

export default function ClientForm({ clientData, setClientData }) {
  const generateClientId = () => {
    const randomNums = Math.floor(100000 + Math.random() * 900000);
    return `CL${randomNums}DZ`;
  };

  const handleGenerateId = () => {
    setClientData({ ...clientData, id: generateClientId() });
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <User size={24} color="var(--primary-color)" />
        Informations Client
      </h2>
      
      <div className="form-group flex-between">
        <div>
          <label>ID Client</label>
          <div className="form-control" style={{ fontWeight: 'bold', background: 'var(--bg-color)' }}>
            {clientData.id || 'Non généré'}
          </div>
        </div>
        <button type="button" className="btn btn-outline" onClick={handleGenerateId}>
          Générer ID
        </button>
      </div>

      <div className="form-group">
        <label>Nom Complet</label>
        <input 
          type="text" 
          className="form-control" 
          value={clientData.name} 
          onChange={e => setClientData({...clientData, name: e.target.value})}
          placeholder="Ex: Jean Dupont"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          className="form-control" 
          value={clientData.email} 
          onChange={e => setClientData({...clientData, email: e.target.value})}
          placeholder="Ex: jean.dupont@email.com"
        />
      </div>

      <div className="form-group">
        <label>Adresse</label>
        <input 
          type="text" 
          className="form-control" 
          value={clientData.address} 
          onChange={e => setClientData({...clientData, address: e.target.value})}
          placeholder="Ex: 123 Rue de la République, Alger"
        />
      </div>
    </div>
  );
}

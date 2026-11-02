import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function InvoicePreview({ clientData, items }) {
  const invoiceRef = useRef(null);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Contenu du QR Code : Infos du client
  const qrContent = JSON.stringify({
    ID: clientData.id,
    Nom: clientData.name,
    Email: clientData.email,
    Total: total
  });

  const generatePDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Facture_${clientData.id || 'Nouveau'}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF');
    }
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <div className="flex-between mb-4">
        <h2 className="card-title" style={{ marginBottom: 0 }}>
          <FileText size={24} color="var(--primary-color)" />
          Aperçu de la Facture
        </h2>
        <button className="btn btn-primary" onClick={generatePDF} disabled={!clientData.id || items.length === 0}>
          <Download size={20} />
          Télécharger PDF
        </button>
      </div>

      <div className="invoice-preview" ref={invoiceRef}>
        <div className="invoice-header">
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>FACTURE</h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Date: {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          
          <div className="qr-container">
            <QRCodeSVG value={qrContent || 'vide'} size={120} />
            <p style={{ marginTop: '0.5rem' }}>Scanner pour les détails</p>
          </div>
        </div>

        <div className="grid" style={{ marginBottom: '3rem', marginTop: '2rem' }}>
          <div>
            <h3 style={{ color: '#6b7280', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Facturé à:</h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.25rem', color: '#111827' }}>{clientData.name || 'Nom du client'}</p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>ID: {clientData.id || 'CLxxxxxxDZ'}</p>
            <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{clientData.email || 'email@exemple.com'}</p>
            <p style={{ color: '#4b5563' }}>{clientData.address || 'Adresse du client'}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ color: '#6b7280', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Émetteur:</h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#111827' }}>Mon Entreprise</p>
            <p style={{ color: '#4b5563' }}>10 Rue des Affaires, Alger</p>
            <p style={{ color: '#4b5563' }}>contact@entreprise.dz</p>
          </div>
        </div>

        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem 0', textAlign: 'left', color: '#4b5563' }}>Description</th>
                <th style={{ padding: '1rem 0', textAlign: 'center', color: '#4b5563' }}>Quantité</th>
                <th style={{ padding: '1rem 0', textAlign: 'right', color: '#4b5563' }}>Prix Unitaire</th>
                <th style={{ padding: '1rem 0', textAlign: 'right', color: '#4b5563' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '1rem 0', color: '#111827' }}>{item.description}</td>
                  <td style={{ padding: '1rem 0', textAlign: 'center', color: '#111827' }}>{item.quantity}</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right', color: '#111827' }}>{item.price.toFixed(2)} DZD</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: '600', color: '#111827' }}>{(item.quantity * item.price).toFixed(2)} DZD</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem 0', textAlign: 'center', color: '#9ca3af' }}>
                    Aucun article ajouté.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="total-section" style={{ borderTop: '2px solid #e5e7eb' }}>
          <div style={{ width: '300px' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem', color: '#4b5563' }}>
              <span>Sous-total:</span>
              <span>{total.toFixed(2)} DZD</span>
            </div>
            <div className="flex-between" style={{ marginBottom: '1rem', color: '#4b5563' }}>
              <span>TVA (0%):</span>
              <span>0.00 DZD</span>
            </div>
            <div className="flex-between" style={{ paddingTop: '1rem', borderTop: '2px solid #f3f4f6' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#111827' }}>Total à payer:</span>
              <span className="total-amount" style={{ color: '#4f46e5' }}>{total.toFixed(2)} DZD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

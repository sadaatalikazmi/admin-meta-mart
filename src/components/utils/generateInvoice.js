import jsPDF from 'jspdf';

const generateInvoice = (campaign) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Meta-Mart', 83, 25);

    doc.setFontSize(18);
    doc.text('Invoice', 90, 40);

    doc.setFontSize(14);
    doc.text(`Campaign:     ${campaign.adName}`, 79, 55);
    doc.text(`Amount:         $ ${campaign.amount} /-`, 79, 65);

    doc.setFontSize(10);
    doc.text('Note: This is a computer generated document and does not require qany signature.', 42, 85);
    
    doc.save(`metamart_invoice.pdf`);
};

export default generateInvoice;
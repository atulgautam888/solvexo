import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = (booking) => {
  try {
    const doc = new jsPDF();
    const accentColor = [170, 59, 255]; // Aapka #aa3bff color

    // 1. --- LOGO / BRANDING ---
    // Yahan hum ek solid circle aur 'TL' text se logo create kar rahe hain (Professional & Vector)
    doc.setFillColor(170, 59, 255);
    doc.roundedRect(15, 12, 15, 15, 3, 3, 'F'); // Purple box for logo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("TL", 19, 22); // Logo Text

    // --- COMPANY NAME ---
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(22);
    doc.text("TrustLocal", 35, 22);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Bhopal's Most Trusted Service Hub", 35, 27);

    // 2. --- HEADER LINE ---
    doc.setDrawColor(230, 230, 230);
    doc.line(15, 35, 195, 35);

    // --- INVOICE INFO (Right Side) ---
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const invoiceId = booking._id ? booking._id.slice(-6).toUpperCase() : '000000';
    doc.text("INVOICE", 150, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`No: TL-${invoiceId}`, 150, 25);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 30);

    // 3. --- BILLING DETAILS ---
    // Bill To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(170, 59, 255);
    doc.text("BILL TO:", 15, 50);
    
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text(`${booking.customer?.name || 'Customer'}`, 15, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`${booking.address || 'Bhopal, MP'}`, 15, 61, { maxWidth: 80 });

    // Service Provider
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(170, 59, 255);
    doc.text("SERVICE EXPERT:", 120, 50);
    
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text(`${booking.provider?.name || 'Local Expert'}`, 120, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Category: ${booking.serviceCategory || 'Service'}`, 120, 61);

    // 4. --- TABLE ---
    autoTable(doc, {
      startY: 75,
      head: [['Service Description', 'Status', 'Rate', 'Amount']],
      body: [
        [
          { content: `${booking.serviceCategory} - ${booking.serviceDetails}`, styles: { fontStyle: 'bold' } },
          booking.status.toUpperCase(),
          `INR ${booking.price}`,
          `INR ${booking.price}.00`
        ],
        ['Platform Convenience Fee', 'PAID', 'INR 50', 'INR 50.00'],
      ],
      headStyles: { fillColor: accentColor, textColor: 255, fontStyle: 'bold' },
      bodyStyles: { textColor: 50 },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      theme: 'striped',
      margin: { left: 15, right: 15 }
    });

    // 5. --- SUMMARY ---
    const finalY = doc.lastAutoTable.finalY + 15;
    const totalPrice = (Number(booking.price) || 0) + 50;

    doc.setFillColor(245, 240, 255); // Light purple background for total
    doc.rect(130, finalY - 10, 65, 25, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(170, 59, 255);
    doc.text("TOTAL AMOUNT:", 135, finalY);
    doc.setTextColor(20, 20, 20);
    doc.text(`INR ${totalPrice}.00`, 135, finalY + 8);

    // 6. --- FOOTER / SIGNATURE ---
    doc.setDrawColor(170, 59, 255);
    doc.setLineWidth(0.5);
    doc.line(15, 260, 60, 260); // Signature line
    doc.setFontSize(8);
    doc.text("Authorized Signatory", 15, 265);

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "italic");
    doc.text("This is a computer-generated receipt and does not require a physical signature.", 105, 275, { align: "center" });
    doc.setTextColor(170, 59, 255);
    doc.setFont("helvetica", "bold");
    doc.text("www.trustlocal.in", 105, 282, { align: "center" });

    // Save PDF
    doc.save(`Invoice_TL_${invoiceId}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Could not generate professional invoice.");
  }
};
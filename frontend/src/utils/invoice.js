import jsPDF from "jspdf";
import { currency, date } from "./format";

export function downloadInvoice(order) {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text("LaundryPro Invoice", 20, 24);
  doc.setFontSize(11);
  doc.text(`Order: ${order.orderId}`, 20, 38);
  doc.text(`Customer: ${order.customerName}`, 20, 46);
  doc.text(`Phone: ${order.phone}`, 20, 54);
  doc.text(`Pickup: ${order.address}`, 20, 62);
  doc.text(`Estimated delivery: ${date(order.estimatedDelivery)}`, 20, 70);

  let y = 86;
  doc.setFontSize(13);
  doc.text("Items", 20, y);
  y += 10;
  doc.setFontSize(11);
  order.garments.forEach((item) => {
    doc.text(`${item.type} x ${item.quantity} @ ${currency(item.price)} = ${currency(item.subtotal)}`, 20, y);
    y += 8;
  });

  doc.setFontSize(16);
  doc.text(`Total: ${currency(order.totalAmount)}`, 20, y + 10);
  doc.save(`${order.orderId}-invoice.pdf`);
}

export function exportCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

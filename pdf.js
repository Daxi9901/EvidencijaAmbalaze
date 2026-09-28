document.getElementById("pdf-btn").addEventListener("click", () => {
  if (!confirm("Želiš li da eksportuješ podatke u PDF?")) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  // Naslov
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Evidencija ambalaže", doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });

  // Priprema redova iz tabele
  const rows = [];
  document.querySelectorAll("#ambalaza-table tbody tr").forEach(tr => {
    const sifra = tr.cells[0].innerText;
    const naziv = tr.cells[1].innerText;
    const zbir = tr.cells[3].innerText;
    rows.push([sifra, naziv, zbir]);
  });

  // Tabela
  doc.autoTable({
    startY: 60,
    head: [["Šifra", "Naziv", "Zbir"]],
    body: rows,
    styles: {
      font: "helvetica",
      fontStyle: "bold",   // podebljano
      fontSize: 18,        // veći font
      halign: "center",
      valign: "middle"
    },
    headStyles: {
      fillColor: [0, 120, 215],
      textColor: [255, 255, 255],
      fontSize: 20,
      fontStyle: "bold"
    },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });

  // Datum
  const now = new Date();
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`IZRADA NA DAN ${now.toLocaleDateString("sr-RS")} ${now.toLocaleTimeString("sr-RS")}`, 40, doc.lastAutoTable.finalY + 40);

  // pitaj korisnika za ime fajla
  let fileName = prompt("Unesi ime PDF fajla (bez ekstenzije):", "EvidencijaAmbalaze");
  if (!fileName) fileName = "EvidencijaAmbalaze";

  doc.save(fileName + ".pdf");
});

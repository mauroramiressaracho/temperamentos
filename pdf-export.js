(() => {
  const button = document.getElementById('download-pdf');
  if (!button) return;

  const PAGE_W_MM = 210;
  const PAGE_H_MM = 297;
  const EXPORT_W_PX = 794;
  const EXPORT_H_PX = 1123;

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function waitForFonts() {
    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }
    await wait(80);
  }

  function createHeader(pageNumber, totalPages) {
    const header = document.createElement('div');
    header.className = 'pdf-header';
    header.innerHTML = `<span>Relatório de Temperamento</span><span>Página ${pageNumber} de ${totalPages}</span>`;
    return header;
  }

  function createFooter() {
    const footer = document.createElement('div');
    footer.className = 'pdf-footer';
    footer.innerHTML = '<span>Material de autoconhecimento. Não constitui avaliação psicológica, diagnóstico ou recomendação clínica.</span><span>Temperamentos</span>';
    return footer;
  }

  function buildSheets(report) {
    const children = Array.from(report.children);
    const stage = document.createElement('div');
    stage.id = 'pdf-render-stage';
    document.body.appendChild(stage);

    const sheets = children.map((child, index) => {
      const sheet = document.createElement('section');
      const isCover = child.classList.contains('report-cover');
      sheet.className = `pdf-sheet${isCover ? ' pdf-cover-sheet' : ''}`;
      sheet.style.width = `${EXPORT_W_PX}px`;
      sheet.style.height = `${EXPORT_H_PX}px`;

      const clone = child.cloneNode(true);
      clone.classList.remove('pdf-page-break');

      if (!isCover) {
        sheet.appendChild(createHeader(index + 1, children.length));
        sheet.appendChild(clone);
        sheet.appendChild(createFooter());
      } else {
        sheet.appendChild(clone);
      }

      stage.appendChild(sheet);
      return sheet;
    });

    return { stage, sheets };
  }

  async function renderSheet(sheet) {
    return html2canvas(sheet, {
      scale: 2,
      useCORS: true,
      backgroundColor: sheet.classList.contains('pdf-cover-sheet') ? '#173a3b' : '#f4f1ea',
      width: EXPORT_W_PX,
      height: EXPORT_H_PX,
      windowWidth: EXPORT_W_PX,
      scrollX: 0,
      scrollY: 0,
      logging: false
    });
  }

  function safeFilename(name) {
    return (name || 'relatorio')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  }

  button.onclick = async () => {
    const old = button.textContent;
    button.textContent = 'Gerando PDF...';
    button.disabled = true;

    let stage;
    try {
      await waitForFonts();
      const report = document.getElementById('report');
      if (!report || !report.children.length) throw new Error('Relatório não encontrado.');

      const built = buildSheets(report);
      stage = built.stage;
      const sheets = built.sheets;

      await wait(120);

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });

      for (let i = 0; i < sheets.length; i++) {
        const canvas = await renderSheet(sheets[i]);
        const img = canvas.toDataURL('image/jpeg', 0.94);
        if (i > 0) pdf.addPage('a4', 'portrait');
        pdf.addImage(img, 'JPEG', 0, 0, PAGE_W_MM, PAGE_H_MM, undefined, 'FAST');
      }

      const name = document.getElementById('full-name')?.value || 'relatorio';
      pdf.save(`temperamento-${safeFilename(name)}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      if (stage) stage.remove();
      button.textContent = old;
      button.disabled = false;
    }
  };
})();

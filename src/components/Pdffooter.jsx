import { rgb } from 'pdf-lib';

const Pdffooter = async ({ pdfDoc }) => {
  const date = new Date().toLocaleString();
  const pages = pdfDoc.getPages();
  const pageCount = pages.length;
  const font = await pdfDoc.embedFont('Helvetica');
  const fontSize = 8;

  for (let i = 0; i < pageCount; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();

    page.drawText(`Page ${i + 1} of ${pageCount}`, {
      x: width - 20,
      y: 10,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Generated on: ${date}`, {
      x: 20,
      y: 10,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
  }
};

export default Pdffooter;

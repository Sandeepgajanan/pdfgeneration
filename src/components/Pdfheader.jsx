import { rgb } from 'pdf-lib';

const Pdfheader = async ({ pdfDoc, page }) => {
  const { width, height } = page.getSize();
  const CompanyName = 'Sample Company';
  const LogoCompany = '';
  const font = await pdfDoc.embedFont('Helvetica');
  const boldFont = await pdfDoc.embedFont('Helvetica-Bold');

  if (LogoCompany) {

  }

  page.drawText(CompanyName, {
    x: 75,
    y: height - 12,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: 10, y: height - 22 },
    end: { x: 200, y: height - 22 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText('Annexure B', {
    x: 100,
    y: height - 20,
    size: 10,
    font: font,
    color: rgb(0, 0, 0),
  });
};

export default Pdfheader;

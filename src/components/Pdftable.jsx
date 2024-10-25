import { productData } from '../constants';
import { rgb } from 'pdf-lib';

const Pdftable = async ({ pdfDoc, page }) => {
  const { width, height } = page.getSize();
  const fontSize = 16;
  const font = await pdfDoc.embedFont('Helvetica');

  page.drawText('Product Group Information Report', {
    x: width / 2,
    y: height - 40,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
    align: 'center',
  });

  const tableData = [
    ['Field', 'Value'],
    ['Product Group Name', productData.productgroupName],
    ['Created On', productData.CreatedOn],
    ['Description', productData.Description],
    ['Grouping Criteria Template', productData.GroupingCriteriaTemplate],
    ['Associated Products', productData.ProductDetails.map(p => p.ProductName).join(', ')],
    ['Is Cleaning Process Similar?', productData.CleaningProcess[0].Is_Cleaning_Process_Similar],
    ['Report Worst Case', productData.ReportWorstCase],
    ['Change Control No', productData.CCNo],
    ['Most Difficult to Clean Products', productData.Cleanability.join(', ')]
  ];

  const cellPadding = 5;
  const cellWidth = width / 2 - cellPadding * 2;
  const cellHeight = 25;
  let yOffset = height - 60;

  for (let i = 0; i < tableData.length; i++) {
    const [field, value] = tableData[i];
    const isHeader = i === 0;

    // Draw cell backgrounds
    page.drawRectangle({
      x: cellPadding,
      y: yOffset - cellHeight,
      width: cellWidth,
      height: cellHeight,
      color: isHeader ? rgb(0.78, 0.78, 0.78) : rgb(1, 1, 1),
      borderWidth: 1,
      borderColor: rgb(0, 0, 0),
    });
    page.drawRectangle({
      x: cellPadding + cellWidth,
      y: yOffset - cellHeight,
      width: cellWidth,
      height: cellHeight,
      color: isHeader ? rgb(0.78, 0.78, 0.78) : rgb(1, 1, 1),
      borderWidth: 1,
      borderColor: rgb(0, 0, 0),
    });

    // Draw text
    page.drawText(field, {
      x: cellPadding * 2,
      y: yOffset - cellHeight / 2,
      size: 10,
      font: font,
      color: rgb(0, 0, 0),
    });
    page.drawText(value.toString(), {
      x: cellPadding * 2 + cellWidth,
      y: yOffset - cellHeight / 2,
      size: 10,
      font: font,
      color: rgb(0, 0, 0),
    });

    yOffset -= cellHeight;
  }

  return null;
}

export default Pdftable;
import { useEffect, useState } from 'react';
import { PDFDocument} from 'pdf-lib';
import Pdfheader from './components/Pdfheader';
import Pdffooter from './components/Pdffooter';
import Pdftable from './components/Pdftable';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const generatePDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      // Generate PDF content
      Pdfheader({ pdfDoc, page });
      Pdftable({ pdfDoc, page });
      Pdffooter({ pdfDoc, page });

      await pdfDoc.encrypt({

        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: false,
          documentAssembly: false,
          extracting: false,
        },
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);

      // Log passwords securely (in a real application, handle these securely)
      console.log('User Password:', userPassword);
      console.log('Owner Password:', ownerPassword);
    };

    generatePDF();
  }, []);

  return (
    <div>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="Generated PDF"
          sandbox="allow-same-origin allow-scripts"
        />
      )}
    </div>
  );
};

export default App;
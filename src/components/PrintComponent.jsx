import React from 'react';
import html2pdf from 'html2pdf.js';
import '../App.css';
import PrintIcon from './Img/print.jpg';
import DownloadIcon from './Img/download.png';

const PrintComponent = ({ children }) => {
   const printAction = () => {
      window.print();
   };

   const createPdfAction = () => {
      const input = document.getElementById('print-component');

      html2pdf(input, {
         margin: 10,
         filename: 'your_report.pdf',
         image: { type: 'jpeg', quality: 0.98 },
         html2canvas: { scale: 2 },
         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).outputPdf().then((pdf) => {
         const blob = pdf.output('blob');
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = 'your_report.pdf';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      });
   };

   return (
      <>
         <thead className='d-flex justify-content-center'>
            <header className='h-32 d-flex justify-content-center align-items-center'>
               <img src={PrintIcon} alt="Print"
                  className="h-16  px-7 me-2 print-preview-button print-d-none"
                  onClick={printAction} />
               <img src={DownloadIcon} alt="Download"
                  className="h-14 px-7 print-preview-button print-d-none"
                  onClick={createPdfAction} />
            </header>
         </thead>
         <tbody>
            <tr>
               <td id="print-component" className='bg-white pt-4'>
                  {/* Render data here */}
                  {children}
               </td>
            </tr>
         </tbody>
         <tfoot className="table-footer">
            {/* <Foot /> */}
         </tfoot>
         <table className="print-component"></table>
      </>
   );
};

export default PrintComponent;

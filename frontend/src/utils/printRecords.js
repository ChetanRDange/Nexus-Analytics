// export const printRecords = (tableHTML, model) => {
//   const iframe = document.createElement("iframe");
//   iframe.style.position = "absolute";
//   iframe.style.top = "-10000px";
//   document.body.appendChild(iframe);
//   const iframeDocument = iframe.contentWindow.document;

//   iframeDocument.open();
//   iframeDocument.write(`
//     <html>
//       <head>
//         <style>

//           table, th, td {
//             border: 1px solid black;
//             border-collapse: collapse;
//             width: 100%;
//           }
//           th, td {
//             padding: 8px;
//             text-align: left;
//           }
//           img {
//             max-width: 25px;
//             max-height: 25px;
//             object-fit: contain;
//           }
//           th:first-child, td:first-child, th:last-child, td:last-child {
//             display: none;
//           }
//           h2 {
//             text-align: center;
//           }
//         </style>
//       </head>
//       <body>
//         <h2>${model} Details</h2>
//         ${tableHTML}
//       </body>
//     </html>
//   `);
//   iframeDocument.close();
//   iframe.contentWindow.focus();
//   iframe.contentWindow.print();
//   iframe.remove();
// };

export const printRecords = (tableHTML, model) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-10000px";
  iframe.style.width = "1200px";
  document.body.appendChild(iframe);

  const iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 10px;
          }
          h2 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          th:first-child, td:first-child, th:last-child, td:last-child {
              display: none;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
            table-layout: auto;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 6px; 
            text-align: left;
            font-size: 10px;
            vertical-align: middle;
          }
          th {
            background-color: #f4f4f4;
            font-size: 11px;
          }
          img {
            max-width: 16px; /* Slightly larger flag images */
            max-height: 16px;
            padding-right:5px;
            padding-bottom:5px;
            vertical-align: middle;
          }
          .badge {
            display: inline-block;
            padding: 4px 8px;
            font-size: 9px;
            border-radius: 8px;
            text-align: center;
            min-width: 55px;
          }
          .active { background-color: #d4edda; color: #155724; }
          .pending { background-color: #fff3cd; color: #856404; }
          .inactive { background-color: #f8d7da; color: #721c24; }
          .required { color: red; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>${model} Details</h2>
        <div style="width: 1200px; overflow-x: hidden;">  <!-- Increase div width -->
          ${tableHTML}
        </div>
      </body>
    </html>
  `);
  iframeDocument.close();
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
  iframe.remove();
};


export const printRecordsCustom = (tableHTML, model) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-10000px";
  iframe.style.width = "1200px";
  document.body.appendChild(iframe);

  const iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 10px;
          }
          h2 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          /* REMOVED the first/last column hiding rule */
          .print-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
            table-layout: auto;
          }
          .print-table th, .print-table td {
            border: 1px solid #ddd;
            padding: 6px; 
            text-align: left;
            font-size: 10px;
            vertical-align: middle;
            white-space: nowrap; /* Prevent text wrapping */
          }
          .print-table th {
            background-color: #f4f4f4;
            font-size: 11px;
          }
          img {
            max-width: 16px;
            max-height: 16px;
            padding-right: 5px;
            padding-bottom: 5px;
            vertical-align: middle;
          }
          .badge {
            display: inline-block;
            padding: 4px 8px;
            font-size: 9px;
            border-radius: 8px;
            text-align: center;
            min-width: 55px;
          }
          .active { background-color: #d4edda; color: #155724; }
          .pending { background-color: #fff3cd; color: #856404; }
          .inactive { background-color: #f8d7da; color: #721c24; }
          .required { color: red; font-weight: bold; }
          .print-container {
            width: 100%; 
            overflow-x: auto; /* Allows horizontal scrolling if needed */
          }
        </style>
      </head>
      <body>
        <h2>${model} Details</h2>
        <div class="print-container">
          ${tableHTML}
        </div>
      </body>
    </html>
  `);
  iframeDocument.close();

  // Wait for content to load before printing
  iframe.onload = function() {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      iframe.remove();
    }, 1000);
  };
};
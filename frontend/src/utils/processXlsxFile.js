import JSZip from "jszip";

// Removes BOM character from XML content
const removeBOM = (str) => (str.charCodeAt(0) === 0xfeff ? str.slice(1) : str);

export const processXlsxFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith(".xlsx")) {
      reject("Invalid file format. Please upload an .xlsx file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const zip = await JSZip.loadAsync(arrayBuffer);
        console.log("these aret the files inside zip", Object.keys(zip.files));
        const worksheetFile = Object.keys(zip.files).find((file) =>
          file.startsWith("xl/worksheets/sheet")
        );

        if (!worksheetFile || !zip.file(worksheetFile)) {
          reject("Worksheet XML not found in .xlsx");
          return;
        }

        const sheetXml = await zip.file(worksheetFile).async("string");
        const sharedStringsXml = zip.file("xl/sharedStrings.xml")
          ? await zip.file("xl/sharedStrings.xml").async("string")
          : null;
        console.log("the sheetXml", sheetXml);
        const sheetDoc = new DOMParser().parseFromString(
          sheetXml,
          "application/xml"
        );
        const sharedStringsDoc = sharedStringsXml
          ? new DOMParser().parseFromString(sharedStringsXml, "application/xml")
          : null;
        console.log("the sheetDoc", sheetDoc);
        console.log("the sharedStringsDoc", sharedStringsDoc);
        const sharedStrings = sharedStringsDoc
          ? Array.from(sharedStringsDoc.getElementsByTagName("t")).map((node) =>
              node.textContent.trim()
            )
          : [];

        const rows = sheetDoc.getElementsByTagName("row");
        if (!rows.length) {
          reject("No rows found in the worksheet.");
          return;
        }

        const headers = [];
        const jsonData = [];
        console.log("the shared strings", sharedStrings);
        Array.from(rows).forEach((row, rowIndex) => {
          const rowData = {};
          const cells = row.getElementsByTagName("c");
          console.log("inside the cell mapping");
          Array.from(cells).forEach((cell, cellIndex) => {
            const valueNode = cell.getElementsByTagName("v")[0];
            let value = valueNode ? valueNode.textContent : "";

            if (cell.getAttribute("t") === "s" && sharedStrings.length > 0) {
              value = sharedStrings[parseInt(value, 10)] || "";
            } else if (cell.getAttribute("t") === "inlineStr") {
              const inlineStrNode = cell.getElementsByTagName("t")[0];
              value = inlineStrNode ? inlineStrNode.textContent.trim() : "";
            }
            console.log("inside the cell mapping 2");
            if (rowIndex === 0) {
              headers[cellIndex] = value;
            } else {
              const columnName =
                headers[cellIndex] || `Column ${cellIndex + 1}`;
              rowData[columnName] = value;
            }
          });

          if (rowIndex > 0) {
            jsonData.push(rowData);
          }
        });
        console.log("this is the jsondata", jsonData);
        resolve(jsonData);
      } catch (error) {
        reject(`Error processing file: ${error.message}`);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

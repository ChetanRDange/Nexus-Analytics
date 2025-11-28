import JSZip from "jszip";

const createXLSX = async (headers, data) => {
  console.log("the headers are", headers);
  console.log("the data is", data);
  try {
    const zip = new JSZip();

    // Add [Content_Types].xml
    zip.file(
      "[Content_Types].xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`
    );

    // Add _rels/.rels
    zip.file(
      "_rels/.rels",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`
    );

    // Add xl/workbook.xml
    zip.file(
      "xl/workbook.xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`
    );

    // Add xl/worksheets/sheet1.xml
    const headerRow = headers
      .map((header) => `<c t="inlineStr"><is><t>${header}</t></is></c>`)
      .join("");
    const dataRows = data
      .map(
        (row) =>
          `<row>${row
            .map((cell) => `<c t="inlineStr"><is><t>${cell}</t></is></c>`)
            .join("")}</row>`
      )
      .join("");
    zip.file(
      "xl/worksheets/sheet1.xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    <row>${headerRow}</row>
    ${dataRows}
  </sheetData>
</worksheet>`
    );

    // Add xl/_rels/workbook.xml.rels
    zip.file(
      "xl/_rels/workbook.xml.rels",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`
    );

    // Add xl/styles.xml
    zip.file(
      "xl/styles.xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"/>`
    );

    // Generate the XLSX file
    const content = await zip.generateAsync({ type: "blob" });

    // Create a download link
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object

    // Return true to indicate success
    return true;
  } catch (error) {
    console.error("Error generating XLSX file:", error);
    // Return false to indicate failure
    return false;
  }
};

export default createXLSX;

// export default createXLSX;

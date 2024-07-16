import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfGeneratorService {
  private fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '../../fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '../../fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, '../../fonts/Roboto-MediumItalic.ttf'),
    },
  };

  private printer = new PdfPrinter(this.fonts);

  async generatePdf(invoiceData: any): Promise<Buffer> {
    const docDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        {
          columns: [
            {
              text: 'From:',
              style: 'subheader',
            },
            {
              text: 'To:',
              style: 'subheader',
              alignment: 'right',
            },
          ],
        },
        {
          columns: [
            {
              text: `${invoiceData.from.companyName}\n${invoiceData.from.address}\n${invoiceData.from.city}, ${invoiceData.from.state} ${invoiceData.from.zip}\n${invoiceData.from.country}`,
            },
            {
              text: `${invoiceData.to.companyName}\n${invoiceData.to.address}\n${invoiceData.to.city}, ${invoiceData.to.state} ${invoiceData.to.zip}\n${invoiceData.to.country}`,
              alignment: 'right',
            },
          ],
        },
        { text: '\n' },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 'auto', 100, 100],
            body: [
              [
                { text: 'Item', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Unit Price', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
              ],
              ...invoiceData.items.map((item) => [
                item.description,
                item.quantity,
                `$${item.unitPrice.toFixed(2)}`,
                `$${(item.quantity * item.unitPrice).toFixed(2)}`,
              ]),
              [
                { text: '', colSpan: 2 },
                {},
                { text: 'Total', bold: true },
                `$${invoiceData.items
                  .reduce(
                    (acc, item) => acc + item.quantity * item.unitPrice,
                    0,
                  )
                  .toFixed(2)}`,
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
    };

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });
  }
}
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfGeneratorService } from './pdf-generator.service';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Post('generate')
  async generatePdf(@Body() invoiceData: any, @Res() res: Response) {
    const pdfBuffer = await this.pdfGeneratorService.generatePdf(invoiceData);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
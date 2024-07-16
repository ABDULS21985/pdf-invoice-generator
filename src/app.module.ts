import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [PdfGeneratorModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

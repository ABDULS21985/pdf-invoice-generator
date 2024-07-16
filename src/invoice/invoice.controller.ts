import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from '@prisma/client';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(@Body() data: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.createInvoice(data);
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: number): Promise<Invoice> {
    return this.invoiceService.getInvoiceById(Number(id));
  }

  @Get()
  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.getAllInvoices();
  }

  @Put(':id')
  async updateInvoice(@Param('id') id: number, @Body() data: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.updateInvoice(Number(id), data);
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: number): Promise<Invoice> {
    return this.invoiceService.deleteInvoice(Number(id));
  }
}
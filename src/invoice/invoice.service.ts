import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Invoice } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(data: any): Promise<Invoice> {
    return this.prisma.invoice.create({
      data: {
        description: data.description,
        amount: data.amount,
        from: JSON.stringify(data.from),
        to: JSON.stringify(data.to),
        items: JSON.stringify(data.items)
      },
    });
  }

  async getInvoiceById(id: number): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({ where: { id } });
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany();
  }

  async updateInvoice(id: number, data: any): Promise<Invoice> {
    const existingInvoice = await this.prisma.invoice.findUnique({ where: { id } });
    if (!existingInvoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    
    return this.prisma.invoice.update({
      where: { id },
      data: {
        description: data.description,
        amount: data.amount,
        from: JSON.stringify(data.from),
        to: JSON.stringify(data.to),
        items: JSON.stringify(data.items)
      },
    });
  }

  async deleteInvoice(id: number): Promise<Invoice> {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
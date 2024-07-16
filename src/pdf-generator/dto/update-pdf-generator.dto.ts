import { PartialType } from '@nestjs/mapped-types';
import { CreatePdfGeneratorDto } from './create-pdf-generator.dto';

export class UpdatePdfGeneratorDto extends PartialType(CreatePdfGeneratorDto) {}

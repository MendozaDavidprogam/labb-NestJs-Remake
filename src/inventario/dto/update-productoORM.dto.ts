import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {}

// src/inventario/entities/inventario.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { Operacion } from 'src/operacion/entities/operacion.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('inventario')
export class Inventario {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Almacén principal' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 100, description: 'Cantidad disponible en stock' })
  @Column()
  existencias: number;

  @ApiProperty({ example: 'activo' })
  @Column({ default: 'activo' })
  estado: string;

  // Relacion con productos (1 inventario puede tener muchos productos)
  @OneToMany(() => Producto, producto => producto.inventario)
  productos: Producto[];

  // Relación con operaciones (1 inventario puede tener muchas operaciones indirectamente)
  @OneToMany(() => Operacion, operacion => operacion.producto)
  operaciones: Operacion[];
}

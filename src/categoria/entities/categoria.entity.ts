// src/categoria/entities/categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Categoria {
  @ApiProperty({example : 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example : 'Electrodomestico'})
  @Column({ unique: true })
  nombre: string;

  @ApiProperty({example : 'Aparatos electricos de hogar'})
  @Column({ unique: true })
  descripcion: string;

  @ApiProperty({ example: true, description: 'Indica si la categoría está activa' })
  @Column({ default: true })
  isActive: boolean;

  // Relacion OneToMany con Producto
  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}

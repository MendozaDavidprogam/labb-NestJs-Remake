// src/categoria/entities/categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  descripcion: string;

  @Column({ default: true })
  isActive: boolean;

  // Relacion OneToMany con Producto
  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}

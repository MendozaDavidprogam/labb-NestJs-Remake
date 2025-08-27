// src/producto/entities/producto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { Operacion } from 'src/operacion/entities/operacion.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ default: 'activo' })
  estado: string;

  // Relacion con Categoria (N productos pueden pertenecer a 1 categoria)
  @ManyToOne(() => Categoria, categoria => categoria.productos, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idcategoria' }) // clave foránea
  categoria: Categoria;

  // Relacion con Inventario (N productos pueden estar en 1 inventario)
  @ManyToOne(() => Inventario, inventario => inventario.productos, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idinventario' }) // clave foránea
  inventario: Inventario;

  // Relacion con Operaciones (1 producto puede tener muchas operaciones)
  @OneToMany(() => Operacion, (operacion: Operacion) => operacion.producto)
  operaciones: Operacion[];
}

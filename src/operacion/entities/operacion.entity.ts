// src/operacion/entities/operacion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';

@Entity('operacion')
export class Operacion {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date; 

  @Column()
  tipo: string;

  @Column()
  concepto: string;

  @Column()
  cantidad: number; 

  // Relacion con Producto (muchas operaciones -> un producto)
  @ManyToOne(() => Producto, producto => producto.operaciones, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idproducto' }) // fk
  producto: Producto;
}

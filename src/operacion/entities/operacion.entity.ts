import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { IsNumber } from 'class-validator';

@Entity('operaciones')
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

  //fk con Producto
  @ManyToOne(() => Producto, producto => producto.operacion, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idproducto' }) // fk
  producto: Producto;


}

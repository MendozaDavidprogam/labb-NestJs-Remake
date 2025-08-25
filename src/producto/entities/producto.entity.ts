import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';



@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  idproducto: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ default: 'activo' })
  estado: string;


  // Relacion ManyToOne con Categoria
  @ManyToOne(() => Categoria, categoria => categoria.productos, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idcategoria' }) // clave foránea
  categoria: Categoria;



}

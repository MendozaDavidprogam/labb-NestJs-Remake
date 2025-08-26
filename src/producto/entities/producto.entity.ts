import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { Operacion } from './operacion.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ default: 'activo' })
  estado: string;

  //fk con Categoria
  @ManyToOne(() => Categoria, categoria => categoria.producto, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idcategoria' }) // clave foránea
  categoria: Categoria;

  // fk con Inventario
  @ManyToOne(() => Inventario, inventario => inventario.productos, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idinventario' }) // clave foránea
  inventario: Inventario;

  // relación con Operación
  @OneToMany(() => Operacion, operacion => operacion.producto)
  operacion : Operacion[];


}

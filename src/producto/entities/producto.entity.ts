import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable: true })
  idcategoria: number;

  @Column({ nullable: true })
  idinventario: number;

  @Column({ default: 'activo' })
  estado: string;
}
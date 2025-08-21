import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Inventario } from 'src/inventario/entities/inventario.entity';


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

  @Column({ nullable: true })
  idcategoria: number;

  @Column({ nullable: true })
  idinventario: number;

  @Column({ default: 'activo' })
  estado: string;


  // Relación inversa con inventario
  @OneToOne(() => Inventario, (inventario) => inventario.producto)
  inventario: Inventario;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

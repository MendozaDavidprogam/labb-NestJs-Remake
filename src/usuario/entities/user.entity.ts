import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  nombreusuario: string;

  @Column()
  email: string;

  @Column()
  contrasena: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  estado: string;

}


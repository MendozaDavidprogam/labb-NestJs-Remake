import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class Usuario {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'David' })
  @Column({ unique: true })
  nombre: string;

  @ApiProperty({ example: 'Mendoza' })
  @Column()
  apellido: string;

  @ApiProperty({ example: 'admin123' })
  @Column()
  nombreusuario: string;

  @ApiProperty({ example: 'admin@mail.com' })
  @Column()
  email: string;

  @ApiProperty({ example: '123456' })
  @Column()
  contrasena: string;

  @ApiProperty({ example: 'user', default: 'user' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({ example: 'activo' })
  @Column({ default: 'activo' })
  estado: string;
}

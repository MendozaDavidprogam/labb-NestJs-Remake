import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsuarioService {
    constructor(
    @InjectRepository(Usuario)
    private userRepo: Repository<Usuario>,
  ) {}


  async findAll() {
    const usuarios = await this.userRepo.find();
    return usuarios.map(({ contrasena, ...rest }) => rest);
  }

  async findById(id: number) {
    const usuario = await this.userRepo.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    const { contrasena, ...rest } = usuario;
    return rest;
  }

  async findByEmail(email: string) {
    const usuario = await this.userRepo.findOneBy({ email });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async create(dto: CreateUserDto) {
    const exists = await this.userRepo.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.contrasena, 10);
    const user = this.userRepo.create({
      ...dto,
      contrasena: hashedPassword,
      role: dto.role || 'usuario',
    });

    const saved = await this.userRepo.save(user);
    const { contrasena, ...rest } = saved;
    return rest;
  }

  async update(id: number, dto: UpdateUserDto) {
    const usuario = await this.userRepo.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const updates: Partial<Usuario> = { ...dto };

    if (dto.contrasena) {
        updates.contrasena = await bcrypt.hash(dto.contrasena, 10);
    }

    await this.userRepo.update(id, updates);

    const updated = await this.userRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException('Usuario actualizado no encontrado');

    const { contrasena, ...rest } = updated;
    return rest;
}


  async remove(id: number) {
    const usuario = await this.userRepo.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    await this.userRepo.delete(id);
    const { contrasena, ...rest } = usuario;
    return rest;
  }
}
import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class ProveedoresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.proveedor.findMany({
      orderBy: { nombre: 'asc' },
    });
  }
  async create(dto: CreateProveedorDto) {
    try {
      return await this.prisma.proveedor.create({ data: dto });
    } catch (error) {
      this.manejarNombreDuplicado(error, dto.nombre);
    }
  }

  async findOne(id: number) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { id },
    });
    if (!proveedor) {
      throw new NotFoundException(`No existe el proveedor ${id}`);
    }
    return proveedor;
  }

    async update(id: number, dto: UpdateProveedorDto) {
    await this.findOne(id);
    try {
      return await this.prisma.proveedor.update({ where: { id }, data: dto });
    } catch (error) {
      this.manejarNombreDuplicado(error, dto.nombre);
    }
  }

    private manejarNombreDuplicado(error: unknown, nombre?: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(`Ya existe un proveedor llamado "${nombre}"`);
    }
    throw error;
  }
}

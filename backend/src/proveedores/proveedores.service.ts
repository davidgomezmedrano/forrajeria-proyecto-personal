import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { ConflictException, Injectable } from '@nestjs/common';
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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Ya existe un proveedor llamado "${dto.nombre}"`,
        );
      }
      throw error;
    }
  }
}

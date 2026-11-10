import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Post()
  create(@Body() dto: CreateProveedorDto) {
    return this.proveedoresService.create(dto);
  }
}

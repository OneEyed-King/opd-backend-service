import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminstratorService } from './adminstrator.service';
import { CreateAdminstratorDto } from './dto/create-adminstrator.dto';
import { UpdateAdminstratorDto } from './dto/update-adminstrator.dto';

@Controller('adminstrator')
export class AdminstratorController {
  constructor(private readonly adminstratorService: AdminstratorService) {}

  @Post()
  create(@Body() createAdminstratorDto: CreateAdminstratorDto) {
    return this.adminstratorService.create(createAdminstratorDto);
  }

  @Get()
  findAll() {
    return this.adminstratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminstratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminstratorDto: UpdateAdminstratorDto) {
    return this.adminstratorService.update(+id, updateAdminstratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminstratorService.remove(+id);
  }
}

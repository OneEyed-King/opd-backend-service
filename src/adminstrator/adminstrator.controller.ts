import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AdminstratorService } from './adminstrator.service';
import { CreateAdminstratorDto } from './dto/create-adminstrator.dto';
import { UpdateAdminstratorDto } from './dto/update-adminstrator.dto';

@Controller('adminstrator')
export class AdminstratorController {
  constructor(private readonly adminstratorService: AdminstratorService) {}
  private readonly logger = new Logger(AdminstratorController.name);

  @Post()
  create(@Body() createAdminstratorDto: CreateAdminstratorDto) {
    this.logger.log('creating adminstrator');
    return this.adminstratorService.create(createAdminstratorDto);
  }

  @Get()
  findAll() {
    this.logger.log('finding all adminstrators');

    return this.adminstratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('finding one adminstrator');

    return this.adminstratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminstratorDto: UpdateAdminstratorDto) {
    this.logger.log('updating adminstrator');

    return this.adminstratorService.update(+id, updateAdminstratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('removing adminstrator');

    return this.adminstratorService.remove(+id);
  }
}

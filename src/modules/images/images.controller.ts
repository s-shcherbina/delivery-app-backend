import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { ImageEntity } from './entities/image.entity';
import { ImagesService } from './images.service';
import { Role, Roles } from 'src/decorators/roles.decorator';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadImage(
    @Body('goodId') goodId: number,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.imagesService.uploadImage(goodId, file);
  }

  @Get()
  getImage(@Query('goodId') goodId: number): Promise<ImageEntity> {
    return this.imagesService.getImage(goodId);
  }

  @Get(':id')
  getImageById(@Param('id') id: number): Promise<ImageEntity> {
    return this.imagesService.getImageById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeImage(@Param('id') id: number): Promise<string> {
    return this.imagesService.removeImage(id);
  }
}

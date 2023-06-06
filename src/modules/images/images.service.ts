import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import * as fs from 'fs';
import { ProductEntity } from '../products/entities/product.entity';
import { join } from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(ProductEntity)
    private readonly goodRepository: Repository<ProductEntity>,
  ) {}

  removeImgFile(name: string) {
    const filePath = join(__dirname, '../../..', 'uploads', name);
    if (fs.existsSync(filePath))
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
  }

  async createImage(file: Express.Multer.File, product: ProductEntity) {
    await this.imageRepository.save({ name: file.filename, product });
  }

  async uploadImage(productId: number, file: Express.Multer.File) {
    const product = await this.goodRepository.findOneBy({ id: productId });
    if (!product) {
      this.removeImgFile(file.filename);
      throw new BadRequestException('No product');
    }

    const image = await this.getImage(productId);
    if (image) await this.removeImage(image.id);

    await this.createImage(file, product);
  }

  async getImage(productId: number): Promise<ImageEntity> {
    return await this.imageRepository
      .createQueryBuilder('image')
      .where('image.goodId = :id', { id: productId })
      .leftJoinAndSelect('image.good', 'good')
      .getOne();
  }

  async getImageById(id: number): Promise<ImageEntity> {
    return await this.imageRepository.findOneBy({ id });
  }

  async removeImage(id: number): Promise<string> {
    const image = await this.imageRepository.findOneBy({ id });
    // if (!image) throw new BadRequestException('Немає фото');
    // this.removeImgFile(image.name);
    if (!image) return 'No photo';
    await this.imageRepository.delete({ id });
    return 'Deleted';
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateProductDTO } from './dto';
import { ProductEntity } from './entities/product.entity';
import { ShopEntity } from '../shops/entities/shop.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ShopEntity)
    private readonly subGroupRepository: Repository<ShopEntity>,
    private readonly imagesService: ImagesService,
  ) {}

  async createProduct(dto: CreateProductDTO): Promise<void> {
    const existProduct = await this.productRepository.findOneBy({
      name: dto.name,
    });
    if (existProduct)
      throw new BadRequestException('The product already exist');

    const shop = await this.subGroupRepository.findOneBy({
      id: dto.shopId,
    });
    if (!shop) throw new BadRequestException('Shop is not exist');

    delete dto.shopId;
    await this.productRepository.save({ ...dto, shop });
  }

  async getProducts(shopId: number): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('good')
      .where('good.shopId = :id', { id: shopId })
      .leftJoinAndSelect('good.shop', 'shop')
      .getMany();
  }

  async getProduct(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOneBy({ id });
  }

  async updateProduct(
    id: number,
    dto: Omit<CreateProductDTO, 'shopId'>,
  ): Promise<string> {
    const existProduct = await this.productRepository.findOneBy({
      name: dto.name,
    });
    // if (existGood && existGood.id == id)
    //   throw new BadRequestException('Не змінили назву');

    // if (existGood && existGood.id != id)
    //   throw new BadRequestException('Такий товар вже існує');

    await this.productRepository.update({ id }, { ...dto });
    return 'Updated';
  }

  async removeProduct(id: number): Promise<string> {
    await this.removeImgProduct(id);
    await this.productRepository.delete({ id });
    return 'Deleted';
  }

  async removeImgProduct(productId: number) {
    const image = await this.imagesService.getImage(productId);
    if (image) this.imagesService.removeImgFile(image.name);
    // if (!image) throw new BadRequestException('Немає фото у цього товару');
    // this.imagesService.removeImgFile(image.name);
  }
}

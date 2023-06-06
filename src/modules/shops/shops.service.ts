import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from './entities/shop.entity';
import { ProductsService } from '../products/products.service';
import { CreateShopDTO } from './dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async createShop(dto: CreateShopDTO) {
    const existShop = await this.shopRepository.findOneBy({ name: dto.name });
    if (existShop) throw new BadRequestException('The shop already exists');

    await this.shopRepository.save({ ...dto });
  }

  async getShops(): Promise<ShopEntity[]> {
    return await this.shopRepository.find();
  }

  async getShop(id: number): Promise<ShopEntity> {
    return await this.shopRepository.findOneBy({ id });
  }

  async updateShop(id: number, dto: CreateShopDTO): Promise<string> {
    const existShop = await this.shopRepository.findOneBy({ id });
    if (!existShop) throw new BadRequestException('The shop is not exists');

    // if (existShop && existShop.id != id)
    //   throw new BadRequestException('Такий shop вже існує');

    await this.shopRepository.update({ id }, { ...dto });
    return 'Updated';
  }

  async removeShop(id: number): Promise<string> {
    const products = await this.productsService.getProducts(id);
    if (!products)
      throw new BadRequestException('The goods in this shop is not exists');

    for (const product of products) {
      await this.productsService.removeImgProduct(product.id);
    }

    await this.shopRepository.delete({ id });
    return 'Deleted';
  }
}

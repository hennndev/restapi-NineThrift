import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    addCategory(body: AddCategoryDto) {
        return 'This action adds a new category';
    }

    getCategories() {
        return `This action returns all categories`;
    }

    getCategory(id: number) {
        return `This action returns a #${id} category`;
    }

    updateCategory(id: number, body: UpdateCategoryDto) {
        return `This action updates a #${id} category`;
    }

    removeCategory(id: number) {
        return `This action removes a #${id} category`;
    }
}

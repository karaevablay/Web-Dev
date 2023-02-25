import { Component } from '@angular/core';
import { Category } from 'src/items/categories';
import { Product, products } from 'src/items/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  items = products;
  allItems = this.items;
  categories = this.handleCategoriesList(this.allItems);

  public get getAllItems(): any {
    return this.allItems;
  }

  public set setAllItems(val: any) {
    this.allItems = val;
  }

  share(link: string) {
    document.location.href = link;
  }

  handleCategory(category: string): void {
    if (category === "Все") {
      this.allItems = this.items;
      return;
    }
    this.allItems = this.items.filter((item: { category: Category }) => item.category.name === category);
  }

  handleCategoriesList(items: Product[]): string[] {
    const categories = new Set<string>();
    categories.add("Все");
    items.forEach((item) => categories.add(item.category.name));
    return Array.from(categories);
  }

  updateLike(likes: number, product: Product) {
    product.likes = likes;
  }

  handleDelete(product: Product): void {
    const index = this.items.indexOf(product);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.allItems = this.items;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListCategoriesService } from 'src/app/services/list-categories.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public productos: Array<any> = []
  public productostemp: Array<any> = []
  public productostemp2: Array<any> = []
  public categorias: Array<any> = []
  public shopingcar: Array<any> = []
  public priceGroup: Array<any> = [
    {
      id: 1,
      name: "De menor a mayor"
    },
    {
      id: 2,
      name: "De mayor a menor"
    }
  ]
  public datasearch: FormGroup = this.fb.group({
    search: [null, [Validators.maxLength(50), Validators.minLength(2)]],
    categories: [null],
    price: [null]
  })

  constructor(
    private productosService: ProductosService,
    private listCategoriesService: ListCategoriesService,
    private fb: FormBuilder
  ) {
    this.productosService.getProductos().subscribe((resp: any) => {
      this.productos = resp
      this.productostemp = resp
    })

    this.listCategoriesService.getProductos().subscribe((resp: any) => {
      this.categorias = resp
    })

    this.datasearch.controls["search"].valueChanges.subscribe(data => {
      if (data) {
        this.productos = this.productostemp.filter(p => p.name.indexOf(data) >= 0)
        this.productostemp2 = this.productos
      } else {
        this.productos = this.productostemp
        this.productostemp2 = []
      }

    })

    this.datasearch.controls["categories"].valueChanges.subscribe(data => {
      this.filter()
    })

    this.datasearch.controls["price"].valueChanges.subscribe(data => {
      this.filter()
    })
  }

  ngOnInit(): void {
  }

  clear() {
    this.datasearch.reset();
  }

  filter() {

    const cat = (this.datasearch.get("categories")?.value) ? this.datasearch.get("categories")?.value : null
    const price = (this.datasearch.get("price")?.value) ? this.datasearch.get("price")?.value : null

    if (cat) {
      if (this.productostemp2.length > 0) {
        this.productos = this.productostemp2.filter(p => p.categories.indexOf(parseInt(cat)) >= 0)
      } else {
        this.productos = this.productostemp.filter(p => p.categories.indexOf(parseInt(cat)) >= 0)
      }
    } else {
      if (this.productostemp2.length > 0) {
        this.productos = this.productostemp2
      } else {
        this.productos = this.productostemp
      }

    }

    if (price == 1) {
      this.productos.sort(function (a, b) { return b.price - a.price });
    } else if (price == 2) {
      this.productos.sort(function (a, b) { return a.price - b.price });
    }

  }

  addCart(prod: any) {
    this.shopingcar.push(prod)
  }

  restCart(i: any){
    
    this.shopingcar.splice(0,i+1)
  }
}
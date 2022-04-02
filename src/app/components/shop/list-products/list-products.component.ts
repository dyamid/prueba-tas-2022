import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  public productos: Array<any> = []

  constructor(
    private productosService: ProductosService
  ) {
    this.productosService.getProductos().subscribe((resp: any) => {
      this.productos = resp
    })
  }

  ngOnInit(): void {
  }

}

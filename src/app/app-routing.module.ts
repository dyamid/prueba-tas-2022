import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'shop', loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule) },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

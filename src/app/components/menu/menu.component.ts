import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

interface MenuItem {
  /**
  * Caminho a ser carregado quando houver o evento de click no menu  
  */
  path: string;
  /**
  * Texto que será exibido no item de menu 
  */
  label: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule,],
  template: `
    @for (item of menuItens; track item.path) {
        <a mat-list-item [href]="item.path">{{ item.label }}</a>
      }
  `,
  styles: ``
})
export class MenuComponent {

  menuItens: Array<MenuItem> = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/categorias',
      label: 'Categorias'
    },
    {
      path: '/suppliers',
      label: 'Fornecedores'
    }
  ]

}

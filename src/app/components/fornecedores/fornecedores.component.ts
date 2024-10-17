import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './fornecedores.component.html',
  styles: ``
})
export class FornecedoresComponent {

}

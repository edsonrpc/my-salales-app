import { Component, Input } from '@angular/core';
import { Fornecedor } from '../../fornecedores-dto';
import { MaterialModule } from '../../../../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fornecedor-card',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './fornecedor-card.component.html',
  styles: ``
})
export class FornecedorCardComponent {
  @Input({ required: true }) fornecedor!: Fornecedor
}

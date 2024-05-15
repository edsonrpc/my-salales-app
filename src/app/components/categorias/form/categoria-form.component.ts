import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Categoria } from '../categoria.dto';

@Component({
  selector: 'categoria-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {

  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter<Categoria>();
  @Input() set categoria(categoria: Categoria) {
    console.log('######## ser categoria');

    this.categoriaForm.setValue(categoria)
  }

  constructor(private formBuilde: FormBuilder) { }
  categoriaForm = this.formBuilde.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  })

  onSubmit() {
    console.log('###### submit', this.categoriaForm.value);
    this.save.emit(this.categoriaForm.value as unknown as Categoria);
  }

  onBack() {
    this.back.emit();
  }
}

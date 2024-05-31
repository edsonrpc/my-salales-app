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

  @Output() back = new EventEmitter()
  @Output() save = new EventEmitter<Categoria>()

  constructor(private formBuilder: FormBuilder) { }
  categoriaForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  })

  @Input() set categoria(categoria: Categoria) {
    console.log('######## ser categoria', categoria)
    this.categoriaForm.setValue(categoria)
  }

  onSubmit() {
    console.log('###### submit', this.categoriaForm.value);
    this.save.emit(this.categoriaForm.value as Categoria)
  }

  onBack() {
    this.back.emit()
  }
}

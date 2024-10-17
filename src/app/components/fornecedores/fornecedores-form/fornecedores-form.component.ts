import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Fornecedor } from '../fornecedores-dto';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedores-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './fornecedores-form.component.html',
  styles: ``
})
export class FornecedoresFormComponent implements OnInit {

  @Input( { required: true }) fornecedor!: Fornecedor
  @Output() save = new EventEmitter<Fornecedor>()
  @Output() back = new EventEmitter()

  fornecedorForm!: FormGroup
  private fb = inject(FormBuilder)
 
  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      id: [this.fornecedor.id],
      companyName: [this.fornecedor.companyName,
        [Validators.required, Validators.minLength(3)
      ]],
      contactName: [this.fornecedor.contactName,
        [Validators.required, Validators.minLength(3)
      ]],
      contactTitle: [this.fornecedor.contactTitle],
      address: this.fb.group({
        city: [this.fornecedor.address.city],
        country: [this.fornecedor.address.country],
        phone: [this.fornecedor.address.phone],
        postalCode: [this.fornecedor.address.postalCode],
        region: [this.fornecedor.address.region],
        street: [this.fornecedor.address.street],
      })
    })
  }

  onSubmit() {
    this.save.emit(this.fornecedorForm.value as Fornecedor)
  }

  onBack(event: Event) {
    event.preventDefault()
    this.back.emit()
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FornecedoresService } from './../fornecedores.service';
import { lastValueFrom, Observable, of } from 'rxjs';
import { Fornecedor } from '../fornecedores-dto';
import { AsyncPipe } from '@angular/common';
import { FornecedoresFormComponent } from '../fornecedores-form/fornecedores-form.component';
import { LoadingBarComponent } from '../../../loading-bar.component';
import { MaterialModule } from '../../../material.module';


@Component({
  selector: 'app-fornecedores-new',
  standalone: true,
  imports: [
    AsyncPipe,
    FornecedoresFormComponent,
    LoadingBarComponent,
    MaterialModule],
templateUrl: './fornecedores-new.component.html',
  styles: ``
})
export class FornecedoresNewComponent {

  router = inject(Router)
  fornecedoresService = inject(FornecedoresService)
  fornecedoresObservable!: Observable<Fornecedor>
  fornecedor!: Fornecedor

  async ngOnInit() {
    this.fornecedoresObservable = await of(this.fornecedoresService.create())
    this.fornecedor = await lastValueFrom(this.fornecedoresObservable)
  }

  async onSave(fornecedor: Fornecedor) {
    this.fornecedoresObservable = this.fornecedoresService.save(fornecedor)
    const resultado = await lastValueFrom(this.fornecedoresObservable)
    console.log('###### resultado', resultado);

    this.router.navigate(['/suppliers/show', resultado.id])
  }

  onBack() {
    this.router.navigate(['suppliers'])
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FornecedoresService } from '../fornecedores.service';
import { Fornecedor } from './../fornecedores-dto';
import { Observable, lastValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common'
import { LoadingBarComponent } from '../../../loading-bar.component';
import { FornecedoresFormComponent } from '../fornecedores-form/fornecedores-form.component';

@Component({
  selector: 'app-fornecedores-edit',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink, FornecedoresFormComponent],
  templateUrl: './fornecedores-edit.component.html',
  styles: ``
})
export class FornecedoresEditComponent implements OnInit {

  router = inject(ActivatedRoute)
  route = inject(Router)
  fornecedorService = inject(FornecedoresService)
  fornecedor!: Fornecedor
  fornecedorObservable!: Observable<Fornecedor>

  async ngOnInit() {
    const id: number = +(this.router.snapshot.paramMap.get('id') || 0)
    this.fornecedorObservable = this.fornecedorService.getById(id)
    this.fornecedor = await lastValueFrom(this.fornecedorObservable)

    console.log('############# fornecedor', this.fornecedor);

  }

  async onSave(fornecedor: Fornecedor) {
    this.fornecedorObservable = this.fornecedorService.save(fornecedor)
    this.fornecedor = await lastValueFrom(this.fornecedorObservable)
    this.route.navigate(['/suppliers/show/', this.fornecedor.id])
  }

  onBack() {
    this.route.navigate(['/suppliers/show/', this.fornecedor.id])
  }
}

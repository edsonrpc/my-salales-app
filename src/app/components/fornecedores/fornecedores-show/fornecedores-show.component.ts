import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FornecedoresService } from '../fornecedores.service';
import { Fornecedor } from '../fornecedores-dto';
import { Observable, lastValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common'
import { LoadingBarComponent } from '../../../loading-bar.component';

@Component({
  selector: 'app-fornecedores-show',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink, LoadingBarComponent],
  templateUrl: './fornecedores-show.component.html',
  styles: ``
})
export class FornecedoresShowComponent implements OnInit {
  route = inject(ActivatedRoute)
  fornecedorService = inject(FornecedoresService)
  fornecedor!: Fornecedor
  fornecedorObservable!: Observable<Fornecedor>

  async ngOnInit() {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0)

    this.fornecedorObservable = this.fornecedorService.getById(id)
    this.fornecedor = await lastValueFrom(this.fornecedorObservable)

    console.log('###### fornecedor', this.fornecedor);

  }
}

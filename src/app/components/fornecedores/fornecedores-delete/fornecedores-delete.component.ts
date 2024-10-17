import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../fornecedores.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Fornecedor } from '../fornecedores-dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MatCardActions, MatCardContent } from '@angular/material/card';
import { LoadingBarComponent } from '../../../loading-bar.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-fornecedores-delete',
  standalone: true,
  imports: [MatCardContent,
    MatCardActions,
    LoadingBarComponent,
    RouterLink,
  AsyncPipe],
templateUrl: './fornecedores-delete.component.html',
  styles: ``
})
export class FornecedoresDeleteComponent implements OnInit {

  constructor(
    private fornecedoresService: FornecedoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  fornecedor!: Fornecedor
  fornecedorObservable!: Observable<Fornecedor>

  async ngOnInit() {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.fornecedorObservable = this.fornecedoresService.getById(id)
    this.fornecedor = await lastValueFrom(this.fornecedorObservable)
  }

  async delete() {
    this.fornecedorObservable = this.fornecedoresService.delete(this.fornecedor.id)
    await lastValueFrom(this.fornecedorObservable)
    this.router.navigate(['/suppliers'])
  }
}

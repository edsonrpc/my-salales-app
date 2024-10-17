import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Fornecedor } from '../fornecedores-dto';
import { Observable, lastValueFrom } from 'rxjs';
import { FornecedoresService } from './../fornecedores.service';
import { RouterLink } from '@angular/router';
import { LoadingBarComponent } from '../../../loading-bar.component';
import { AsyncPipe } from '@angular/common'
import { FornecedorCardComponent } from "./fornecedor-card/fornecedor-card.component";

@Component({
    selector: 'app-fornecedores-list',
    standalone: true,
    templateUrl: './fornecedores-list.component.html',
    styles: ``,
    imports: [MaterialModule, RouterLink, LoadingBarComponent, AsyncPipe, FornecedorCardComponent]
})
export class FornecedoresListComponent implements OnInit {
  fornecedores!: Fornecedor[]
  fornecedorObservable!: Observable<Fornecedor[]>

  constructor(
    private fornecedorService: FornecedoresService
  ) {}
  
  async ngOnInit() {
    this.fornecedorObservable = this.fornecedorService.getAll()
    this.fornecedores = await lastValueFrom(this.fornecedorObservable)
  }


}

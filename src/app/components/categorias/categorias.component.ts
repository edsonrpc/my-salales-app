import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { MatSortModule, MatSort } from '@angular/material/sort'
import { CategoriasItem } from './categorias-datasource'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { Categoria } from './categoria.dto'
import { CategoriasService } from './categorias.service'
import { lastValueFrom } from 'rxjs'
import { CategoriaFormComponent } from './form/categoria-form.component'
import { MatIconModule } from '@angular/material/icon'
import { LoadingBarComponent } from '../../loading-bar.component'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: `
    .full-width-table {
      width: 100%
    }
    
  `,
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CategoriaFormComponent,
    LoadingBarComponent
  ]
})


export class CategoriasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatTable) table!: MatTable<CategoriasItem>
  dataSource = new MatTableDataSource<Categoria>()
  categoria!: Categoria
  showLoading = false

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions']

  ngAfterViewInit(): void {
    this.loadCategorias()
  }

  showForm: boolean = false
  constructor(private categoriasService: CategoriasService) { }

  async loadCategorias(): Promise<void> {
    this.showLoading = true
    const categoria = await lastValueFrom(this.categoriasService.getAll())
    this.dataSource = new MatTableDataSource(categoria)
    this.table.dataSource = this.dataSource
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.showLoading = false
  }

  onNovaCategoria() {
    this.categoria = {
      id: 0,
      name: '',
      description: ''
    }
    this.showForm = true
  }

  hideCategoriaForm() {
    this.showForm = false
    this.loadCategorias()
  }

  onSave(categoria: Categoria) {
    const saved = lastValueFrom(this.categoriasService.save(categoria))
    console.log('#### salvei? ', saved)
    this.hideCategoriaForm()
  }

  onEditCategorias(catergoria: Categoria) {
    this.categoria = catergoria
    this.showForm = true
  }

  async onDeleteCategoria(categoria: Categoria) {
    if (confirm(`Apagar ${categoria.name} com o id ${categoria.id}?`)) {
      this.showLoading = true
      await lastValueFrom(this.categoriasService.delete(categoria.id))
      this.showLoading = false
      this.loadCategorias()
    }
  }
}

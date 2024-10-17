import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { FornecedoresListComponent } from './components/fornecedores/fornecedores-list/fornecedores-list.component';
import { FornecedoresShowComponent } from './components/fornecedores/fornecedores-show/fornecedores-show.component';
import { FornecedoresEditComponent } from './components/fornecedores/fornecedores-edit/fornecedores-edit.component';
import { FornecedoresDeleteComponent } from './components/fornecedores/fornecedores-delete/fornecedores-delete.component';
import { FornecedoresNewComponent } from './components/fornecedores/fornecedores-new/fornecedores-new.component';

export const routes: Routes = [
    {
        path: 'categorias',
        component: CategoriasComponent
    },
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'suppliers',
        component: FornecedoresComponent,
        children: [
            {
                path: '',
                component: FornecedoresListComponent
            },
            {
                path: 'show/:id',
                component: FornecedoresShowComponent
            },
            {
                path: 'edit/:id',
                component: FornecedoresEditComponent
            },
            {
                path: 'del/:id',
                component: FornecedoresDeleteComponent
            },
            {
                path: 'new',
                component: FornecedoresNewComponent
            },
        ]
    },
];

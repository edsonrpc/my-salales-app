import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'categorias',
        component: CategoriasComponent
    },
    {
        path: '',
        component: DashboardComponent
    }
];

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedores-dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(environment.api + 'suppliers')
  }

  public getById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(environment.api + 'suppliers/' + id)
  }

  public save(fornecedor: Fornecedor): Observable<Fornecedor> {
    console.log('###### fornecedor recebido', fornecedor);

    if (fornecedor.id)
      return this.http.put<Fornecedor>(environment.api + 'suppliers/' + fornecedor.id, fornecedor)
    return this.http.post<Fornecedor>(environment.api + 'suppliers', fornecedor)
  }

  public delete(id?: number): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(environment.api + 'suppliers/' + id)
  }

  public create(): Fornecedor {
    return {
      id: 0,
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: {
        city: '',
        phone: '',
        country: '',
        postalCode: 0,
        region: '',
        street: ''
      }
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  url = 'http://localhost:8080'; 
  
  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  // Obtem todos os funcionários
  getFuncionarios(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.url + '/funcionarios')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  
  // Obter um funcinário pelo id
  getFuncionarioById(idFuncionario: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(this.url + '/funcionario/' + idFuncionario)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um funcionário
  salvarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.url, JSON.stringify(funcionario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualizar um funcionário
  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(this.url, JSON.stringify(funcionario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deletar um funcionário
  deletarFuncionario(funcionario: Funcionario) {
    return this.httpClient.delete<Funcionario>(this.url + '/funcionario/' + funcionario.idFuncionario, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

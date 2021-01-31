import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario } from './models/funcionario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'desafio-cnpq';
  
  funcionario = {} as Funcionario;
  funcionarioAtualizar = {} as Funcionario;
  funcionarios: Funcionario[];
  
  constructor(private funcionarioService: FuncionarioService) {
	  this.funcionarios = [];
  }
  
  ngOnInit() {
    this.getFuncionarios();
  }
  
  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
  }
  
  gravarFuncionario(form: NgForm) {
    if (this.funcionario.idFuncionario !== undefined) {
	  this.funcionarioService.getFuncionarioById(this.funcionario.idFuncionario).subscribe(() => {
	    this.funcionarioAtualizar});
	  
	  this.funcionarioAtualizar.nmFuncionario = this.funcionario.nmFuncionario;
	  this.funcionarioAtualizar.dsDescricao = this.funcionario.dsDescricao;
	
      this.funcionarioService.atualizarFuncionario(this.funcionarioAtualizar).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.funcionarioService.salvarFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  
  deletarFuncionario(funcionario: Funcionario) {
	if (confirm('Deseja confirmar a exclusão do funcionário?')) {
      this.funcionarioService.deletarFuncionario(funcionario).subscribe(() => {
        this.getFuncionarios();
      });
	}
  }

  atualizarFuncionario(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };
  }

  cleanForm(form: NgForm) {
    this.getFuncionarios();
    form.resetForm();
    this.funcionario = {} as Funcionario;
  }
}

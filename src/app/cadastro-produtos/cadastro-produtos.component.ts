import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent {


  //atributos
  mensagem: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){
  }


  //criando o objeto para capturar os campos
  //do formulário na página e envia-los para a API
  formCadastro = new FormGroup({
    /* campo 'nome' */
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    /* campo 'preco' */
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    /* campo: 'quantidade' */
    quantidade: new FormControl('', [Validators.required, Validators.min(1)])
  });


  //função para acessar os campos do formulário
  //e exibir mensagens de erro de validação
  get form(): any {
    return this.formCadastro.controls;
  }


  //função para realizar o cadastro do produto na API
  onSubmit(): void {
    //exibir o componente do ngx-spinner
    this.spinner.show();    
    //acessando o endpoint de cadastro de produto da API
    this.httpClient.post(environment.apiProdutos, this.formCadastro.value)
      .subscribe({ //capturado o retorno da API
        next: (data: any) => {
          //exibindo mensagem de sucesso
          this.mensagem = `Produto ${data.nome}, cadastrado com sucesso.`;
          //limpar os campos do formulário
          this.formCadastro.reset();
        }
      }).add(() => {
        //fechando o componente ngx-spinner
        this.spinner.hide();
      });
  }
}






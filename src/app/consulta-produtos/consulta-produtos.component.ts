import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-consulta-produtos',
  templateUrl: './consulta-produtos.component.html',
  styleUrls: ['./consulta-produtos.component.css']
})
export class ConsultaProdutosComponent implements OnInit {


  //atributos (array de objetos)
  produtos: any[] = [];
  mensagem: string = '';


  //construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
  }


  //função executada no momento em que a página é aberta
  ngOnInit(): void {
    //exibindo o componente ngx-spinner
    this.spinner.show();
    //fazendo a requisição para o serviço GET de consulta de produtos da API
    this.httpClient.get(environment.apiProdutos)
      .subscribe({ //capturando a resposta da API
        next: (data) => { //data -> nome dado para capturar o retorno da consulta
          this.produtos = data as any[]; //armazenando os produtos obtidos
        }
      }).add(() => {
        this.spinner.hide();
      })
  }


  //função executada ao clicar no botão de exclusão
  onDelete(id: string): void {
    //verificar se o usuário deseja mesmo excluir o produto
    if(window.confirm('Deseja realmente excluir o produto?')) {      
      //exibindo o componente ngx-spinner
      this.spinner.show();
      //fazendo uma requisição para o endpoint DELETE da api
      this.httpClient.delete(environment.apiProdutos + "/" + id)
        .subscribe({
          next: (data: any) => {
            //exibindo mensagem de sucesso
            this.mensagem = `Produto ${data.nome}, excluído com sucesso.`;
            //recarregar a consulta de produtos
            this.ngOnInit();
          }
        })
        .add(() => {
            this.spinner.hide(); //fechando o spinner  
        })    
    }
  }
}






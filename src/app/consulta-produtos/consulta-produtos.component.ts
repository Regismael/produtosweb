import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-consulta-produtos',
  templateUrl: './consulta-produtos.component.html',
  styleUrls: ['./consulta-produtos.component.css']
})
export class ConsultaProdutosComponent implements OnInit {


  //atributos (array de objetos)
  produtos: any[] = [];


  //construtor
  constructor(
    private httpClient: HttpClient
  ) {
  }


  //função executada no momento em que a página é aberta
  ngOnInit(): void {
    //fazendo a requisição para o serviço GET de consulta de produtos da API
    this.httpClient.get(environment.apiProdutos)
      .subscribe({ //capturando a resposta da API
        next: (data) => { //data -> nome dado para capturar o retorno da consulta
          this.produtos = data as any[]; //armazenando os produtos obtidos
        }
      })
  }
}





import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';


defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  titulo = 'Eventos';

  eventosFiltrados: Evento[];
  eventos: Evento[];

  modoSalvar = 'post';

  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = true;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

  FILTRO_LISTA: string;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localService.use('pt-br');
  }

  get filtroLista(): string{
    return this.FILTRO_LISTA;
  }
  set filtroLista(value: string) {
    this.FILTRO_LISTA = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  ngOnInit(): void {
    this.getEventos();
    this.validation();
  }

  editarEvento(evento: Evento, template: any): void{
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  novoEvento(template: any): void{
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any): void {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any): void {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Deletado com Sucesso!');
        }, error => {
          this.toastr.error(`Erro ao tentar deletar: ${error}`);
          console.log(error);
        }
    );
  }

  openModal(template: any): void {
    this.registerForm.reset();
    template.show();
  }

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation(): void {
    this.registerForm = this.formBuilder.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemURL: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(10000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    });
  }

  salvarAlteracao(template: any): void {
    if (this.registerForm.valid){
      if (this.modoSalvar === 'post'){
        this.evento = Object.assign({}, this.registerForm.value);
        console.log(this.evento);

        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Inserido com sucesso!');
          }, error => {
            this.toastr.error(`Erro ao inserir: ${error}` );
            console.log(error);
          }
        );
      }else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        console.log(this.evento);
        this.eventoService.putEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Editado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}` );
            console.log(error);
          }
        );
      }
    }
  }

  getEventos(): void {
    this.eventoService.getAllEvento().subscribe(
      (EVENTOS: Evento[]) => {
        this.eventos = EVENTOS;
        this.eventosFiltrados = this.eventos;
        console.log(EVENTOS);
      }, error => {
        this.toastr.error(`Erro ao carregar eventos: ${error}`);
        console.log(error);
      }
    );
  }

}

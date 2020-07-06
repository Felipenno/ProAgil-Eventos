import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = true;
  modalRef: BsModalRef;

  FILTRO_LISTA: string;

  constructor(private eventoService: EventoService, private modalService: BsModalService) { }

  get filtroLista(): string{
    return this.FILTRO_LISTA;
  }
  set filtroLista(value: string) {
    this.FILTRO_LISTA = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  ngOnInit(): void {
    this.getEventos();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
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

  getEventos(): void {
    this.eventoService.getAllEvento().subscribe(
      (EVENTOS: Evento[]) => {
        this.eventos = EVENTOS;
        this.eventosFiltrados = this.eventos;
        console.log(EVENTOS);
      }, error => {
        console.log(error);
      }
    );
  }

}

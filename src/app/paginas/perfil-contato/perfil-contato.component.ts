import { SeparadorComponent } from './../../componentes/separador/separador.component';
import { ContatoService } from './../../services/contato.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css',
  imports: [CommonModule, ContainerComponent, RouterLink, SeparadorComponent],
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato = {
    id: 0,
    nome: '',
    avatar: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contato = contato;
      });
    }
  }

  excluir() {
    if (this.contato.id) {
      this.contatoService.excluirContato(this.contato.id).subscribe(() => {
        this.router.navigateByUrl('/lista-contatos');
      });
    }
  }
}

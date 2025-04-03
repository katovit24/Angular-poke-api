import { Component, Input } from '@angular/core';
import { ServicioPokemon } from '../../service/servicio-pokemon.service';
import { PokeInterface } from '../../interfaces/poke-interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-etiqueta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etiqueta.component.html',
  styleUrl: './etiqueta.component.css'
})
export class EtiquetaComponent {

  constructor( private servicio : ServicioPokemon){

  }

  @Input() pokemon : PokeInterface | undefined
  
  public getByType(type : string){
    this.servicio.getByType(type);
  }
}

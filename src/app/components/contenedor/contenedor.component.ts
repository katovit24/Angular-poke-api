import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ServicioPokemon } from '../../service/servicio-pokemon.service';
import { PokeInterface } from '../../interfaces/poke-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contenedor',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.css'
})
export class ContenedorComponent {
  pokemonCards : PokeInterface[] = [];
  constructor( private servicio : ServicioPokemon){
    
  }

  async ngOnInit() {
    this.pokemonCards = await this.servicio.listadoDefinitivo(); 
  }
}

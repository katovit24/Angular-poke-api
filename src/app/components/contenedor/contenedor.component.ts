import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ServicioPokemon } from '../../service/servicio-pokemon.service';
import { PokeInterface } from '../../interfaces/poke-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contenedor',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.css'
})
export class ContenedorComponent {

  numeroCarga : number = 0;
  pokemonCards : PokeInterface[] = [];
  todosPokemon : PokeInterface[] = [];
  pokemonFiltrar : PokeInterface[] = [];
  types : string[] = [];
  imagesTypes : any[] = [];
  input : string = "";
  cargando : boolean = false;


  constructor( private servicio : ServicioPokemon){
    
  }

  async filtrar() {
    this.cargando = true;
    
    this.pokemonFiltrar = await this.servicio.getAll(); // Cargar todos solo una vez
   
    this.pokemonCards = this.pokemonFiltrar.filter((pokemon)=>{
      return pokemon.numero<1500;
    }).filter(pokemon =>
      pokemon.nombre.toLowerCase().includes(this.input.toLowerCase())
    );
    this.cargando =false;
  }

  async cargaMas(){
    this.todosPokemon = await this.servicio.listadoDefinitivo(); 
    this.servicio.offset+=this.servicio.numerocarga;
    this.pokemonCards= this.pokemonCards.concat(this.todosPokemon)
    
  }

  async cargaTipos(){

    this.types =  await this.servicio.getTypes();
    this.imagesTypes = this.types.map((type)=>{
      return {
        img: "assets/" + type + ".png",
        name: type
      }
    })

    console.log(this.imagesTypes)
  }

  async ngOnInit() {
    this.cargaMas()
    this.cargaTipos()
  }


}

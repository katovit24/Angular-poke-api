import { Injectable } from '@angular/core';
import { PokeInterface } from '../interfaces/poke-interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioPokemon {

  constructor(private http : HttpClient) { }

  
  listaUrl : string[] = [];
  listaPokemon : string[] = [];
  listaCard : PokeInterface[] = [];
  

  dameDatos(){
    return new Promise<string[]>((resolve , reject)=>{
      this.http.get("https://pokeapi.co/api/v2/pokemon?limit=219&offset=0").subscribe((data : any) =>{
        data.results.forEach((pokemon : any) => {
          this.listaUrl.push(pokemon.url);
        });
        resolve(this.listaUrl);
      });
      
    }
  )}

listadoPokemon(){

  return this.dameDatos()
  .then((urls : string []) => {
    const arrayPromesas = urls.map((url =>firstValueFrom(this.http.get(url))))
    return Promise.all(arrayPromesas)
  })

}

listadoDefinitivo(): Promise<PokeInterface[]>{
  return this.listadoPokemon()
  .then((lista : any[])=>{
    lista.forEach((elemento : any) =>{
      const pokemon : PokeInterface = {nombre : "", numero : 0, imagen : ""}
      pokemon.nombre = elemento.name;
      pokemon.numero = elemento.id;
      pokemon.imagen = elemento.sprites.other['official-artwork'].front_default
      this.listaCard.push(pokemon)
    })
    return this.listaCard
  })
}

}
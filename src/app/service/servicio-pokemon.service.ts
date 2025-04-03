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
  todosPokemon : PokeInterface[]= [];
  listaTypes: string[] = [];
  private _numerocarga: number = 30;
  public offset = 0;

  public get numerocarga(): number {
    return this._numerocarga;
  }
  public set numerocarga(value: number) {
    this._numerocarga = value;
  }
  
  

  dameDatos(){
    return new Promise<string[]>((resolve , reject)=>{
      this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.numerocarga}&offset=${this.offset}`)
      .subscribe((data : any) =>{
        this.listaUrl = data.results.map((pokemon : any)=>{
          return pokemon.url;
        })
        resolve(this.listaUrl);
      });
      });
      
    }
  
  async listadoPokemon(){

  const urls = await this.dameDatos();
  const arrayPromesas = urls.map((url => firstValueFrom(this.http.get(url))));
  return await Promise.all(arrayPromesas);

}

async listadoDefinitivo(): Promise<PokeInterface[]> {
  const lista = await this.listadoPokemon();
  return lista.map((elemento: any) => ({
    nombre: elemento.name,
    numero: elemento.id,
    imagen: elemento.sprites.other['official-artwork'].front_default,
    type : elemento.types.map((e : any) =>{
      return e.type.name
    })
  }));
}

async getAll(){

  if(this.todosPokemon.length===0){

  this.numerocarga = 100000;
  this.offset = 0;
  this.todosPokemon = await this.listadoDefinitivo();
  }
  return  this.todosPokemon
}

async getByType(type : string){

  this.numerocarga = 100000;
  this.offset = 0;
  this.todosPokemon = await this.listadoDefinitivo();
  this.todosPokemon.filter((pokemon : any)=>{
    return pokemon.type == type
  })

}

async getTypes(){
  return new Promise<any>((resolve, reject) => {
    this.http.get("https://pokeapi.co/api/v2/type?offset=00&limit=18")
    .subscribe((data:any)=>{
      this.listaTypes = data.results.map((type:any)=>{
        return type.name;
      })
      resolve (this.listaTypes);
    });
    
  });
}


}
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeInterface } from '../../interfaces/poke-interface';
import { EtiquetaComponent } from "../etiqueta/etiqueta.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [EtiquetaComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() pokemon : PokeInterface | undefined
}

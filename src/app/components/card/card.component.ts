import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeInterface } from '../../interfaces/poke-interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() pokemon : PokeInterface | undefined
}

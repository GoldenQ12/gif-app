import { Component, Input, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-gifs-card',
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  constructor (private gifService: GifsService) {}
  ngOnInit(): void {
    if (!this.gif ) throw new Error('Gif required!');
  }
}

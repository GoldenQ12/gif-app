import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyimage.component.html',
})
export class LazyimageComponent implements OnInit {
  ngOnInit(): void {
    if (!this.url) throw new Error('Method not implemented.');
  }

  public hasLoaded: boolean = false;

  @Input()
  public url!: string;
  @Input()
  public alt!: string | '';
  
  onLoad(){
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}

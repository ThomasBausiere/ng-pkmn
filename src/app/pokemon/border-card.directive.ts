import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]',
  standalone: true
})
export class BorderCardDirective {
  @Input('pkmnBorderCard') borderColor: string;

  private initialColor: string ='#f5f5f5';
  private defaultColor: string ='#009688';
  private defaultHeight: number = 180;

  constructor(private el:ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
    
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);

  }
  private setBorder(color:string){
    
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
  private setHeight(height:number){
    this.el.nativeElement.style.height = `${height}px`;
  }


}

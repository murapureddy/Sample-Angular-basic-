import { Directive,ElementRef,Renderer2,HostListener ,Input,AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective implements AfterViewInit{
  @Input() inputvalue:string;
  constructor(private renderer: Renderer2, private elmRef: ElementRef) { 
   /* elmRef.nativeElement.style.color="red";
    elmRef.nativeElement.style.backgroundColor="#ccccff";
    elmRef.nativeElement.style.fontSize='40px'; */
  }

  /* This one by setting some color throgh selector like <h1 appChangeColor inputvalue="blue">*/
  ngAfterViewInit(): void {
	this.elmRef.nativeElement.style.color = this.inputvalue;
    }
    /*this HostListner we called mouseover and mouseleave in the by using custom directive */
    @HostListener('mouseover') onMouseOver() {  
     this.changeBackgroundColor('#337ab7');
   } 
    @HostListener('mouseleave') onMouseLeave() {  
     this.changeBackgroundColor('');  
   } 
   private changeBackgroundColor(color: string) {  
     this.elmRef.nativeElement.style.color = color;  
   } 

}

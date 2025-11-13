import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  private defaultColor = '#ffeb3b';

  @Input() highlightColor: string = this.defaultColor;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 2px 4px rgba(0,0,0,0.1)');
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.highlightColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.9');
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 6px 12px rgba(0,0,0,0.2)');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 2px 4px rgba(0,0,0,0.1)');
    }
  }
}
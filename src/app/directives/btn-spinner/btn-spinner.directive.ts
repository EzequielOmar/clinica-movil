import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[btnSpinner]',
})
export class BtnSpinnerDirective implements OnInit, OnChanges {
  private el: ElementRef;
  private defaultText: string = '';
  @Input() spinner!: boolean;

  constructor(el: ElementRef, private rd: Renderer2) {
    this.el = el;
  }

  ngOnInit(): void {
    this.defaultText = this.el.nativeElement.innerText;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.spinner.currentValue) {
      this.drawLoadingState();
    } else if (this.defaultText) {
      this.el.nativeElement.disabled = !this.el.nativeElement.disabled;
      this.el.nativeElement.innerText = this.defaultText;
    }
  }

  private drawLoadingState() {
    this.el.nativeElement.innerText = 'Procesando...';
    this.el.nativeElement.disabled = !this.el.nativeElement.disabled;
    let span = this.rd.createElement('span');
    this.rd.addClass(span, 'spinner-border');
    this.rd.addClass(span, 'spinner-border-sm');
    this.rd.addClass(span, 'mx-2');
    this.rd.setAttribute(span, 'role', 'status');
    this.rd.setAttribute(span, 'aria-hidden', 'true');
    this.rd.insertBefore(
      this.el.nativeElement,
      span,
      this.el.nativeElement.firstChild
    );
  }
}

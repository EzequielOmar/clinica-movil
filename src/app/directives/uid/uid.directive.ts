import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Directive({
  selector: '[uid]',
})
export class UidDirective {
  sub?: Subscription;
  mail: string = '';

  constructor(
    el: ElementRef,
    private Auth: AuthService,
    private rd: Renderer2
  ) {
    this.sub = this.Auth.authUserObservable.subscribe((u) => {
      this.mail = u?.email ?? '';
      if (this.mail) el.nativeElement.innerText = this.mail;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

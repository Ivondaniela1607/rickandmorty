import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { environment } from "../../../environments/environment";


@Directive({
  selector: "[appImgError]"
})
export class ImgErrorDirective {
  @Input() appImgError?: string = `${environment.IMG_PIPE_GENERAL_PATH}`;

  private hasError = false;
  
  constructor(private elementImg: ElementRef<HTMLImageElement>) {}
  
  @HostListener("error")
  onError(): void {
    if (!this.hasError) {
      this.hasError = true;
      this.elementImg.nativeElement.src =
        this.appImgError || `${environment.IMG_PIPE_GENERAL_PATH}`;
    }
  }
  
}

import { Directive, Output, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen=false;
    //@HostBinding('style.backgroundColor') bgcolor='transparent';

    @HostListener('click') toggleOpen(){
        this.isOpen=!this.isOpen;
       
    }

}
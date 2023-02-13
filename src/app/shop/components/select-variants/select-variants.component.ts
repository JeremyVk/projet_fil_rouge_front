import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseVariant } from '../../interfaces/baseVariant';

@Component({
  selector: 'app-select-variants',
  templateUrl: './select-variants.component.html',
  styleUrls: ['./select-variants.component.css']
})
export class SelectVariantsComponent implements OnInit {
  @Input() variants: Array<BaseVariant> = [];
  @Output() eventSelectedVariant = new EventEmitter<BaseVariant>();

  displayVariants:boolean = false;
  selectedVariant: BaseVariant = {};
  constructor() { }

  ngOnInit(): void {
    this.selectedVariant = this.variants[0];
  }

  toggleDisplayVariants() {
    this.displayVariants = !this.displayVariants
  }

  changeSelectedVariant(variant: BaseVariant) {
    this.selectedVariant = variant;
    this.eventSelectedVariant.emit(variant);
  }

}

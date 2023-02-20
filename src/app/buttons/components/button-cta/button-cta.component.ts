import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-cta',
  templateUrl: './button-cta.component.html',
  styleUrls: ['./button-cta.component.css']
})
export class ButtonCtaComponent implements OnInit {
  @Input() bgColor: string = '';
  @Input() text: string = '';
  @Input() form: any = false;
  constructor() { }

  ngOnInit(): void {
  }

}

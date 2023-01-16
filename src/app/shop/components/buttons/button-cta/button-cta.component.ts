import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-cta',
  templateUrl: './button-cta.component.html',
  styleUrls: ['./button-cta.component.css']
})
export class ButtonCtaComponent implements OnInit {
  @Input() bgColor: string = '';
  @Input() text: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}

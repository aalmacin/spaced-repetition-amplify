import { Component, OnInit } from '@angular/core';

const black = '#0b1112';
const red = '#BC6FAD';
const green = '#6FBCA4';
const blue = '#6FADBC';
const blueDark = '#6F87BC';
const white = '#ffffff';
const white2 = '#f0f6f8';

@Component({
  selector: 'app-design-tokens',
  templateUrl: './design-tokens.component.html',
  styleUrls: ['./design-tokens.component.scss']
})
export class DesignTokensComponent implements OnInit {
  public styles = [
    { name: 'black on red', color: black, bgColor: red },

    { name: 'black on green', color: black, bgColor: green },

    { name: 'black on blue', color: black, bgColor: blue },

    { name: 'black on blue dark', color: black, bgColor: blueDark },
    { name: 'white 2 on blue dark', white2: black, bgColor: blueDark },

    { name: 'black on white', color: black, bgColor: white },
    { name: 'red on white', color: red, bgColor: white },
    { name: 'green on white', color: green, bgColor: white },
    { name: 'blue on white', color: blue, bgColor: white },
    { name: 'blue dark on white', color: blueDark, bgColor: white },

    { name: 'black on white 2', color: black, bgColor: white2 },
    { name: 'red on white 2', color: red, bgColor: white2 },
    { name: 'green on white 2', color: green, bgColor: white2 },
    { name: 'blue on white 2', color: blue, bgColor: white2 },
    { name: 'blue dark on white 2', color: blueDark, bgColor: white2 },

    { name: 'red on black', color: red, bgColor: black },
    { name: 'green on black', color: green, bgColor: black },
    { name: 'blue on black', color: blue, bgColor: black },
    { name: 'blue dark on black', color: blueDark, bgColor: black }
  ];

  constructor() {}

  ngOnInit() {}
}

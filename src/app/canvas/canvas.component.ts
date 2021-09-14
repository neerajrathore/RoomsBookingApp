import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {



  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  north = null;
  south = null;
  east = null;
  west = null;
  aB = null;
  //val = null;




  private ctx: CanvasRenderingContext2D;
  constructor() { }





  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // this.ctx.fillStyle = 'blue';
    // this.ctx.strokeStyle = 'red';
    // this.ctx.fillRect(150, 150, 250, 250);
    // this.ctx.stroke();
    //this.draw(50, 50, 100);


    //this one draw working rect
    const rectXPos = 150;
    const rectYPos = 150;
    const rectWidth = 200;
    const rectHeight = 200;
    const thickness = 1;
    this.ctx.fillStyle='#000';
    this.ctx.fillRect(rectXPos - (thickness), rectYPos - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
    this.ctx.fillStyle='#FFF';
    this.ctx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);

    const rectXPoss = 3;
    const rectYPoss = 353;
    const rectWidths = 592;
    const rectHeights = 100;
    const thicknesss = 1;
    this.ctx.fillStyle='#000';
    this.ctx.fillRect(rectXPoss - (thicknesss), rectYPoss - (thicknesss), rectWidths + (thicknesss * 2), rectHeights + (thicknesss * 2));
    this.ctx.fillStyle='#FFF';
    this.ctx.fillRect(rectXPoss, rectYPoss, rectWidths, rectHeights);

    //
  }


  // set the initial input-text values to the width/height vars

  // $function() {
  //   //
  //   var canvas = document.getElementById.('canvas');
  //   var ctx=canvas.getContext("2d");
  // };


  animate1() {
    const x = 20;
    const y = 20;
    console.log(x+this.north);

    //this.aB = parseInt(this.x);
  //   this.ctx.fillStyle = 'red';
  // const square = new Rect(this.ctx);
  // square.draw(5, 1, 20);

    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x+this.north, y);
    this.ctx.lineTo(x+this.south, y+this.east);
    this.ctx.lineTo(x, y+this.west);
    this.ctx.lineTo(x, y);
    //this.ctx.closePath();
    this.ctx.stroke();
    //this.animate2();
  }
  animate2() {
    this.ctx.lineTo(300, 250);
    this.ctx.stroke();
    this.animate3();
  }
  animate3() {
    //
    this.ctx.lineTo(400, 300);
    this.ctx.stroke();
    this.animate4();
  }
  animate4() {
    //
    this.ctx.closePath();
    this.ctx.stroke();
  }
  clear() {
    this.ctx.clearRect(0, 0, 600, 600);
  }

  // draw(x: number, y: number, z: number) {
  //   this.ctx.fillRect(z * x, z * y, z, z);
  // }

}

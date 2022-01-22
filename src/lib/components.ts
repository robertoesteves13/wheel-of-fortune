import type { Drawable2D } from './renderer';
import type { Item } from './data';

interface Coordinates {
  x: number,
  y: number
}

export class Wheel implements Drawable2D {
  private items: Item[];
  private radius: number;
  private acceleration: number = 0;

  constructor(pRadius: number) {
    this.radius = pRadius;
    this.items = [{
      name: "test",
      color: "green"
    }]
  }

  private drawPieSlice(ctx: CanvasRenderingContext2D, startingPoint: Coordinates, interval: number, acc: number) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "gray"
    ctx.fillStyle = this.items[acc].color;

    ctx.beginPath();
    ctx.moveTo(startingPoint.x, startingPoint.y);
    ctx.arc(startingPoint.x, startingPoint.y, this.radius, interval * acc, interval * (acc+1));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private rotateWheel(ctx: CanvasRenderingContext2D) {
    ctx.translate(ctx.canvas.height / 2, ctx.canvas.width / 2);
    ctx.rotate(20 * Math.PI / 180 * this.acceleration);
    ctx.translate(ctx.canvas.height / 2 * -1, ctx.canvas.width / 2 * -1);

    if (this.acceleration > 0) {
      this.acceleration -= 0.01;
    } else if (this.acceleration < 0) {
      this.acceleration = 0;
    }
  }

  private drawMiddle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.lineWidth = 10;
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius / 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  private drawPie(ctx: CanvasRenderingContext2D) {
    const canvasCenter: Coordinates = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    }

    const itemsNumber = this.items.length;
    const interval = Math.PI * 2 / itemsNumber;

    for (let i = 1; i <= itemsNumber; ++i) {
      const startingPoint: Coordinates = {
        x: Math.sin(interval * i) + canvasCenter.x,
        y: Math.cos(interval * i) + canvasCenter.y
      }

      this.drawPieSlice(ctx, startingPoint, interval, i-1);
    }
  }

  public addItem(item: Item) {
    this.items = [...this.items, item];
  }

  public spin(force: number) {
    this.acceleration += force;
  }

  private drawBorder(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 10;
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.rotateWheel(ctx);

    this.drawPie(ctx);
    this.drawMiddle(ctx);
    this.drawBorder(ctx);
  }
}

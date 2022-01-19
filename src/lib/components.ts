import type { Drawable2D } from './renderer';

export class Wheel implements Drawable2D {
  private items: string[] = [];
  private radius: number;

  constructor(pRadius: number) {
    this.radius = pRadius;
  }
  
  public drawPie(ctx: CanvasRenderingContext2D) {
    const canvasCenter = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    }

    const itemsNumber = this.items.length;
    const interval = Math.PI * 2 / itemsNumber;

    if (itemsNumber <= 1) return;

    ctx.beginPath();
    for (let i = 0; i < itemsNumber; i++) {
      ctx.moveTo(canvasCenter.x, canvasCenter.y);
      let coordsX = this.radius * Math.sin(interval * i) + canvasCenter.x;
      let coordsY = this.radius * Math.cos(interval * i) + canvasCenter.y;
      ctx.lineTo(coordsX, coordsY);
    }

    ctx.stroke();
  }

  public addItem(item: string) {
    this.items = [...this.items, item];
  }

  public drawBorder(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2;

    this.drawPie(ctx);
    this.drawBorder(ctx);
  }
}

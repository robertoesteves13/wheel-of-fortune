export interface Drawable2D {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class Circle implements Drawable2D {
  public radius: number;

  constructor(pRadius: number) {
    this.radius = pRadius;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export class Renderer2D {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drawableList: Drawable2D[] = [];

  private sizeX: number;
  private sizeY: number;

  constructor(pCanvas: HTMLCanvasElement) {
    this.canvas = pCanvas;
    this.ctx = this.canvas.getContext('2d');

    this.sizeX = this.canvas.width;
    this.sizeY = this.canvas.height;
  }

  public addDrawable<T extends Drawable2D>(pDrawable: T) {
    this.drawableList.push(pDrawable);
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.sizeX, this.sizeY);
    for (const drawable of this.drawableList) {
      drawable.draw(this.ctx);
    }
  }
}

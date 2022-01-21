<script lang="ts">
  import { onMount } from "svelte";
  import type { Item } from "./data";
  import { Renderer2D } from "./renderer";
  import { Wheel } from "./components";

  export let item: Item;

  let canvas: HTMLCanvasElement;
  let canvasSize = 300;

  let renderer: Renderer2D;
  let wheel = new Wheel(canvasSize / 2 * 0.95);

  $: if (item.name && item.color) {
    wheel.addItem(item);
  }

  function eventLoop() {
    renderer.draw();
    window.requestAnimationFrame(eventLoop);
  }

  onMount(() => {
    renderer = new Renderer2D(canvas);
    renderer.addDrawable(wheel);

    window.requestAnimationFrame(eventLoop);
  });
</script>

<canvas bind:this={canvas} width={canvasSize} height={canvasSize}/>

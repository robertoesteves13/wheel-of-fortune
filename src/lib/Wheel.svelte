<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer2D } from "./renderer";
  import { Wheel } from "./components";

  let canvas: HTMLCanvasElement;
  let canvasSize = 300;

  onMount(() => {
    const renderer = new Renderer2D(canvas);

    const items = ["a", "b"];
    const wheel = new Wheel(canvasSize / 2 * 0.95, items);

    renderer.addDrawable(wheel);
    renderer.draw();
  });
</script>

<canvas bind:this={canvas} width={canvasSize} height={canvasSize}/>

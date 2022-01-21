<script lang="ts">
  import Wheel from "./lib/Wheel.svelte";
  import { Item } from "./lib/data";

  let input: string;
  let color = "red";
  let item = new Item();

  function addItem() {
    item = {
      name: input,
      color: color
    };

    if (color == "red") {
        color = "blue";
      } else {
        color = "red";
      }
    input = "";
  }
</script>

<main>
  <h1>Spin the Wheel!</h1>
  <Wheel {item}/>
  <h2>Add item to pool</h2>
  <div>
    <input type="text" bind:value={input}/>
    <button on:click={addItem}>Add</button>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  h2 {
    font-weight: normal;
  }
</style>

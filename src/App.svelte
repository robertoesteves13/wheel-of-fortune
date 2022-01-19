<script lang="ts">
  import Wheel from './lib/Wheel.svelte'
</script>

<main>
  <h1>Spin the Wheel!</h1>
  <Wheel/>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
</style>

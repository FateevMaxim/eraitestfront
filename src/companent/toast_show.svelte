<script>
  import { fly } from 'svelte/transition'
  import { ToastText } from '../store.js'

  let showValue = false
  function showMessage(){
    showValue = true
    setTimeout(()=>{
      showValue = false
      ToastText.set('')
    }, 3000)
    
  }

  $: $ToastText && showMessage()

</script>

{#if showValue}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="container" in:fly="{{ y: 200, duration: 500 }}" out:fly="{{ y: -300, duration: 1000 }}"
    on:click={()=>{
      showValue = false
    }}
  >
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{$ToastText}</label>
  </div>
{/if}


<style>
  .container{
    position: fixed;
    top: 20px;
    left: 0px;
    right: 0px;
    z-index: 100;
    padding: 30px;
    display: grid;
    justify-content: end;
  }
  label{
    max-width: 500px;
    color: white;
    background-color: black;
    padding: 10px 20px 10px 20px;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
  }
</style>

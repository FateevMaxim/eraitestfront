<script>
// @ts-nocheck
  import { QRCode_Text, Scaner_Default } from '../store.js'
  import { fade } from 'svelte/transition'
  import QrCode_2 from 'svelte-qrcode'
  
  let show = false
  let qr_text
  function function_2(){
    if($QRCode_Text == 'Inventory Mode')
      qr_text = $Scaner_Default.inventory_mode
    if($QRCode_Text == 'Clear Data')
      qr_text = $Scaner_Default.clear_data
    if($QRCode_Text == 'Real-time Mode')
      qr_text = $Scaner_Default.real_time_mode
    if($QRCode_Text != '')
      show = true
  }

  $: $QRCode_Text && function_2()
  
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="back" transition:fade 
    on:click={()=>{
      show = false
      $QRCode_Text = ''
    }}
  >
    <div class="container">
      <QrCode_2 value="{qr_text}" size=200 />
      <p>{$QRCode_Text}</p>
    </div>
  </div>
{/if}

<style>
  .back{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: grid;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .container{
    background-color: white;
    padding: 25px;
  }
  .container p{
    margin-top: 5px;
    font-weight: 400;
  }
</style>

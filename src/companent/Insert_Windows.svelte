<script>
  import { Insert_Dialog, ConfigInfo, UserInfo } from '../store.js'
  import { fade } from 'svelte/transition'

  let placeholder
  if($UserInfo[0].status == 'Client'){
    placeholder = 'Описание посылки'
  }else{
    placeholder = 'Текст сообщения'
  }

</script>

{#if $Insert_Dialog.show}
  <div class="background" transition:fade>
    <div class="container">
      <div class="title">
        <h2 style="font-weight: 400;">{$ConfigInfo[0].name_company}</h2>
      </div>
      <div>
        <div style="padding: 20px;">
          <h3 style="color: gray;">{$Insert_Dialog.title_text}</h3>
          <br>
          {#if $UserInfo[0].status == 'Client'}
            <input class="input_phone" type="text" placeholder="Трек код" bind:value={$Insert_Dialog.track_code}>
          {/if}
          <textarea name="" id="" rows="8" placeholder="{placeholder}" bind:value={$Insert_Dialog.text}></textarea>
        </div>
        <div>
          <button class="btn" on:click={()=>{
            $Insert_Dialog.otvet = 'yes'
          }}>Добавить</button>
          <br><br>
          <button class="btn" on:click={()=>{
            $Insert_Dialog.otvet = 'no'
          }}>
            Отмена
          </button>
          <br><br><br><br>
        </div>
      </div>
    </div>
  </div> 
{/if}


<style>
  .background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: grid;
    grid-template-columns: 1fr;
    padding: 40px;
    justify-content: center;
    align-items: center;
    z-index: 4;
  }
  .container{
    display: grid;
    grid-template-rows: 60px auto;
    width: 100%;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-bottom: 150px;
  }
  .title{
    background-color: rgb(30, 30, 30);
    border-radius: 5px 5px 0px 0px;
    color: white;
    padding-top: 20px;
  }
  .btn{
    width: 50%;
    padding: 10px 15px 10px 15px;
    font-size: 1.1rem;
  }
  .btn:active{
    color: silver;
  }
  textarea{
    width: 100%;
    font-size:1rem;
    border: 1.5px solid gray;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
  }
</style>

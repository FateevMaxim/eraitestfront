<script>
  import { navigate } from "svelte-navigator"
  import { onMount } from 'svelte'
  import { ServerHost } from '../store.js'

  let loader = false
  let val_1 = 0, val_2 = 'текущий'
  let serv_data_1 = []

  async function function_1(){
    loader = true
    if (val_1 == 0){
      val_2 = 'текущий'
    }else{
      val_2 = 'предыдущий'
    }
    const response = await fetch(`${$ServerHost}/api_19/?val_1=${val_1}`)
    serv_data_1 = await response.json()
    loader = false
  }

  onMount(async() => {
    function_1()
  })
</script>

<main>
  <div class="title">
    <h1>Модераторы</h1>
    <h3>Количество добавленных пользователей на <mark>{val_2}</mark> месяц</h3>
  </div>
  <div class="but_container">
    <button class="comp_btn" 
      on:click={()=>{
        val_1 = 1
        function_1()
      }}
    >Предыдущий</button>
    <button class="comp_btn" 
      on:click={()=>{
        val_1 = 0
        function_1()
      }}
    >Текущий</button>
  </div>
  {#if loader == true}
    <div class="loader_container">
      <span class="loader"></span>
    </div>
  {:else}
    {#each serv_data_1 as data}
      <p style="margin-top: 10px; color:gray;">{data.name}</p>
      <h2>{Number(data.count).toLocaleString('en-US')}</h2>
    {/each}
  {/if}
  <div style="text-align: center; margin-top: 30px;">
    <button class="add_btn" on:click={()=>{navigate("/Route_5", { replace: true })}}>Назад</button>
  </div>
</main>

<style>
  main{
    background-color: white;
    padding: 20px;
  }
  h1{
    font-weight: 600;
  }
  h2{
    font-weight: 600;
    margin-bottom: 10px;
  }
  h3{
    font-weight: 300;
  }
  .add_btn{
    width: 50%;
    margin-top: 20px;
    padding: 10px;
    border: none;
    font-size: 1.5rem;
    background-color: rgb(124, 124, 124);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: rgb(255, 255, 255);
  }
  .add_btn:active{
    background-color: rgb(155, 155, 155);
  }
  .but_container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

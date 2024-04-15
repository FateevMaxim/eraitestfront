<script>
  import { navigate } from "svelte-navigator"
  import { QRCode_Text, Scaner_Default } from '../store.js'
</script>

<div class="container">
  <div>
    <button on:click={()=>{
      $QRCode_Text = 'Inventory Mode'
    }} title="Режим ТСД"><i class="material-icons">wb_iridescent</i></button>
    <br><br>
    <button on:click={()=>{
      $QRCode_Text = 'Clear Data'
    }} title="Отчистить память"><i class="material-icons">clear_all</i></button>
    <br><br>
    <button on:click={()=>{
      $QRCode_Text = 'Real-time Mode'
    }} title="В режиме реального времени"><i class="material-icons">slow_motion_video</i></button>
    <br><br>
    <button title="Сканер штрих кода по умолчанию"
      on:click={()=>{
        $Scaner_Default = {}
      }} 
    >
      <i class="material-icons">build</i>
    </button>
    <br><br>
    <button on:click={()=>{
      localStorage.setItem('login', '')
      localStorage.setItem('password', '')
      navigate("/", { replace: true })
    }} title="Выход из системы"><i class="material-icons">remove_circle_outline</i></button>
  </div>
</div>

<style>
  .container{
    display: grid;
    align-items: center;
    position: absolute;
    height: 100%;
    top: 0;
    right: -70px;
  }
  button{
    width: 50px;
    height: 50px;
    color: white;
    background-color: rgb(83, 83, 83);
    border-radius: 50%;
    border: none;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  button:hover{
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.4);
  }
  i{
    margin-top: 3px;
    font-size: 1.8rem;
  }
</style>

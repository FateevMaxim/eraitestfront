<script>
// @ts-nocheck

  import { navigate } from "svelte-navigator"
  import { onMount } from 'svelte'
  import { ServerHost, ToastText, GorodInfo } from '../store.js'

  let start = null, stop = null, status = '', gorod_name = '', operator_name = '', punkt_name = ''
  let operator = [], punkt_vidach = []
  let loader = false
  let table_data =[]

  async function function_1(){
    if (start == null || stop == null){
      $ToastText = 'Диапазон даты не выбрана'
      return
    }
    if (status == ''){
      $ToastText = 'Статус поиска не выбрана'
      return
    }
    if (status == 'Отправлено в город' && gorod_name == ''){
      $ToastText = 'Город не выбран'
      return
    }
    loader = true
    const response = await fetch(`
      ${$ServerHost}/api_18/?start=${start}&stop=${stop}&status=${status}&gorod_name=${gorod_name}&operator_name=${operator_name}&punkt_name=${punkt_name}
    `)
    table_data = await response.json()
    if (table_data.length > 0){
      let table_count = table_data.length.toLocaleString('en-US')
      $ToastText = 'Найдено ' + table_count
    } else {
      $ToastText = 'Нечего не найдено'
    }
    loader = false
  }

  onMount(async() => {
    const response = await fetch(`${$ServerHost}/api_0_3`)
    operator = await response.json()
    const response_2 = await fetch(`${$ServerHost}/api_0_4`)
    punkt_vidach = await response_2.json()
	})
</script>

<main style="padding: 20px;">
  <div class="title">
    <div class="container">
      <div>
        <p>Начало</p>
        <input type="date" bind:value={start}>
      </div>
      <div>
        <p>Конец</p>
        <input type="date" bind:value={stop}>
      </div>
      <div>
        <p>Статус</p>
        <select bind:value={status} on:change={()=>{
          gorod_name = ''
          operator_name = ''
          punkt_name = ''
        }}>
          <option>Получено в Китае</option>
          <option>Получено в Алматы</option>
          <option>Отправлено в город</option>
          <option>Получено клиентом</option>
        </select>
      </div>
      <div>
        <p>Город</p>
        <select bind:value={gorod_name} on:change={()=>{
          if(status != 'Отправлено в город'){
            $ToastText = 'Статус поиска должен быть "Отправлено в город"'
            gorod_name = ''
          }
        }}>
          {#each $GorodInfo as data}
            <option>{data.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <p>Оператор</p>
        <select bind:value={operator_name} on:change={()=>{
          if(gorod_name == ''){
            $ToastText = 'Город не выбран'
            operator_name = ''
          }
        }}>
          {#each operator as data}
            <option>{data.user}</option>
          {/each}
        </select>
      </div>
      <div>
        <p>Пункт выдачи</p>
        <select bind:value={punkt_name} 
          on:change={()=>{
            if (status != 'Получено клиентом'){
              $ToastText = 'Статус поиска должен быть "Получено клиентом"'
              punkt_name = ''
            }
          }}
        >
          {#each punkt_vidach as data}
            <option>{data.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_container">
        <button class="comp_btn" on:click={function_1}>Поиск</button>
        <button class="comp_btn" 
          on:click={()=>{
            status = ''
            gorod_name = ''
            operator_name = ''
            punkt_name = ''
            table_data = []
          }}
        >Отчистить поиск</button>
        <!-- svelte-ignore missing-declaration -->
        <button class="comp_btn" 
          on:click={()=>{
            let table2excel = new Table2Excel()
            table2excel.export(document.querySelectorAll("table"))
          }}>Экспорт в Excel</button>
        <button class="comp_btn" 
          on:click={()=>{
            localStorage.setItem('login', '')
            localStorage.setItem('password', '')
            navigate("/", { replace: true })
          }}>Выход</button>
      </div>
    </div>
  </div>
  
  {#if loader == true}
    <br><br><br>
    <div class="loader_container">
      <span class="loader"></span>
    </div>
  {:else if Object.keys(table_data).length != 0}
    <table>
      <thead>
        <tr>
          <th style="padding-left: 10px;">№</th>
          <th>Трек код</th>
          <th>Пол. в Китае</th>
          <th>Пол. в Алматы</th>
          <th>Отправлено</th>
          <th>Куда, кем</th>
          <th>Пол. клиентом</th>
          <th>Выдано кем</th>
        </tr>
      </thead>
      <tbody>
        {#each table_data as data, i}
          <tr>
            <td style="padding-left: 10px;">{i + 1}.</td>
            <td style="max-width: 200px;">{data.track_code}</td>
            {#if data.guangzhou != null}
              <td>{new Date(`${data.guangzhou}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</td>
            {:else}
              <td>-</td>
            {/if}
            {#if data.almaty != null}
              <td>{new Date(`${data.almaty}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</td>
            {:else}
              <td>-</td>
            {/if}
            {#if data.gorod_out != null}
              <td>
                <p>{new Date(`${data.gorod_out}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</p>
              </td>
            {:else}
              <td>-</td>
            {/if}
            {#if data.gorod_out != null}
              <td>
                <p>{data.gorod_name}</p>
                <p class="gray_p">{data.user}</p>
              </td>
            {:else}
              <td>-</td>
            {/if}
            {#if data.client_out != null}
              <td>{new Date(`${data.client_out}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</td>
            {:else}
              <td>-</td>
            {/if}
            {#if data.out_login != null}
              <td>{data.out_login}</td>
            {:else}
              <td>-</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <h2 style="text-align: center; margin-top: 20px;">Не найдено</h2>
  {/if}
</main>

<style>
main{
  background-color: white;
}
.title{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  height: 160px;
  background-color: rgb(240, 240, 240);
  padding: 20px;
  padding-bottom: 30px;
  gap: 20px;
}
.container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  
}
.bottom{
  display: grid;
  justify-content: center;
}
.bottom_container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  width: 800px;
}
input{
  margin-top: 3px;
}
/* Table */
table{
  width: 100%;
  border-spacing: 0;
  font-size: 1rem;
  margin-top: 10px;
}
th{
  border-bottom: 1px solid rgb(204, 204, 204);
  color: rgb(78, 78, 78);
  padding-bottom: 10px;
  text-align: left;
  font-weight: 400;
}
td{
  border-bottom: 1px solid rgb(204, 204, 204);
  padding-top: 10px;
  padding-bottom: 10px;
}
.gray_p{
  font-size: 0.9rem;
  color: gray;
}
</style>

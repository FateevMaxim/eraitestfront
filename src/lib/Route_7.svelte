<script>
// @ts-nocheck
  import { navigate } from "svelte-navigator"
  import { onMount } from 'svelte'
  import { ServerHost } from '../store.js'

  let loader = true
  let client_site ={
    today_login: '0',
    today_track: '0',
    month_track: '0',
    whatsapp_count: '0'
  }
  let operator = []
  let goroda = []

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart1);

  let ten_day = []
  function drawChart1() {
    if (ten_day.length > 0){
      var data = google.visualization.arrayToDataTable([
        ['День', 'Китай', { role: 'style' }, { role: 'annotation' }, 'Алматы', { role: 'style' }, { role: 'annotation' }, 'Выдача', { role: 'style' }, { role: 'annotation' }],
        [ten_day[0].text, Number(ten_day[0].summ_china), "#ff7300", ten_day[0].china_text, Number(ten_day[0].summ_almaty), "#4fe22b", ten_day[0].almty_text, Number(ten_day[0].summ_out), "#009ddb", ten_day[0].out_text],
        [ten_day[1].text, Number(ten_day[1].summ_china), "#ff7300", ten_day[1].china_text, Number(ten_day[1].summ_almaty), "#4fe22b", ten_day[1].almty_text, Number(ten_day[1].summ_out), "#009ddb", ten_day[1].out_text],
        [ten_day[2].text, Number(ten_day[2].summ_china), "#ff7300", ten_day[2].china_text, Number(ten_day[2].summ_almaty), "#4fe22b", ten_day[2].almty_text, Number(ten_day[2].summ_out), "#009ddb", ten_day[2].out_text],
        [ten_day[3].text, Number(ten_day[3].summ_china), "#ff7300", ten_day[3].china_text, Number(ten_day[3].summ_almaty), "#4fe22b", ten_day[3].almty_text, Number(ten_day[3].summ_out), "#009ddb", ten_day[3].out_text],
        [ten_day[4].text, Number(ten_day[4].summ_china), "#ff7300", ten_day[4].china_text, Number(ten_day[4].summ_almaty), "#4fe22b", ten_day[4].almty_text, Number(ten_day[4].summ_out), "#009ddb", ten_day[4].out_text],
        [ten_day[5].text, Number(ten_day[5].summ_china), "#ff7300", ten_day[5].china_text, Number(ten_day[5].summ_almaty), "#4fe22b", ten_day[5].almty_text, Number(ten_day[5].summ_out), "#009ddb", ten_day[5].out_text],
        [ten_day[6].text, Number(ten_day[6].summ_china), "#ff7300", ten_day[6].china_text, Number(ten_day[6].summ_almaty), "#4fe22b", ten_day[6].almty_text, Number(ten_day[6].summ_out), "#009ddb", ten_day[6].out_text],
        [ten_day[7].text, Number(ten_day[7].summ_china), "#ff7300", ten_day[7].china_text, Number(ten_day[7].summ_almaty), "#4fe22b", ten_day[7].almty_text, Number(ten_day[7].summ_out), "#009ddb", ten_day[7].out_text],
        [ten_day[8].text, Number(ten_day[8].summ_china), "#ff7300", ten_day[8].china_text, Number(ten_day[8].summ_almaty), "#4fe22b", ten_day[8].almty_text, Number(ten_day[8].summ_out), "#009ddb", ten_day[8].out_text],
        [ten_day[9].text, Number(ten_day[9].summ_china), "#ff7300", ten_day[9].china_text, Number(ten_day[9].summ_almaty), "#4fe22b", ten_day[9].almty_text, Number(ten_day[9].summ_out), "#009ddb", ten_day[9].out_text]
      ]);

      var options = {
        fontSize: 16,
        bar: {groupWidth: '70%'},
        annotations: {alwaysOutside: true},
        chartArea: {width: '65%', top: 0, bottom: 0, left: 110, right: 0},
        legend: { position: "none" }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div1'));
      chart.draw(data, options);
    }
  }

  let five_month = []
  function drawChart2() {
    // if (ten_day.length > 0){
      var data = google.visualization.arrayToDataTable([
        ['День', 'Китай', { role: 'style' }, { role: 'annotation' }, 'Алматы', { role: 'style' }, { role: 'annotation' }, 'Выдача', { role: 'style' }, { role: 'annotation' }],
        [`${five_month[0].text_month_5}`, Number(five_month[0].china_month_5), "#ff7300", `${Number(five_month[0].china_month_5).toLocaleString('en-US')}`, Number(five_month[0].almaty_month_5), "#4fe22b", `${Number(five_month[0].almaty_month_5).toLocaleString('en-US')}`, Number(five_month[0].out_month_5), "#009ddb", `${Number(five_month[0].out_month_5).toLocaleString('en-US')}`],
        [`${five_month[0].text_month_4}`, Number(five_month[0].china_month_4), "#ff7300", `${Number(five_month[0].china_month_4).toLocaleString('en-US')}`, Number(five_month[0].almaty_month_4), "#4fe22b", `${Number(five_month[0].almaty_month_4).toLocaleString('en-US')}`, Number(five_month[0].out_month_4), "#009ddb", `${Number(five_month[0].out_month_4).toLocaleString('en-US')}`],
        [`${five_month[0].text_month_3}`, Number(five_month[0].china_month_3), "#ff7300", `${Number(five_month[0].china_month_3).toLocaleString('en-US')}`, Number(five_month[0].almaty_month_3), "#4fe22b", `${Number(five_month[0].almaty_month_3).toLocaleString('en-US')}`, Number(five_month[0].out_month_3), "#009ddb", `${Number(five_month[0].out_month_3).toLocaleString('en-US')}`],
        [`${five_month[0].text_month_2}`, Number(five_month[0].china_month_2), "#ff7300", `${Number(five_month[0].china_month_2).toLocaleString('en-US')}`, Number(five_month[0].almaty_month_2), "#4fe22b", `${Number(five_month[0].almaty_month_2).toLocaleString('en-US')}`, Number(five_month[0].out_month_2), "#009ddb", `${Number(five_month[0].out_month_2).toLocaleString('en-US')}`],
        [`${five_month[0].text_month_1}`, Number(five_month[0].china_month_1), "#ff7300", `${Number(five_month[0].china_month_1).toLocaleString('en-US')}`, Number(five_month[0].almaty_month_1), "#4fe22b", `${Number(five_month[0].almaty_month_1).toLocaleString('en-US')}`, Number(five_month[0].out_month_1), "#009ddb", `${Number(five_month[0].out_month_1).toLocaleString('en-US')}`],
      ]);

      var options = {
        fontSize: 16,
        bar: {groupWidth: '60%'},
        annotations: {alwaysOutside: true},
        chartArea: {width: '100%', top: 20, bottom: 50, left: 0, right: 0},
        legend: { position: "none" }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
      chart.draw(data, options);
    }
  // }

  let client_itog = []
  function drawChart3() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      [`На сегодня \n ${client_itog[0].countClient}`, 200],
      [`Есть доступ \n ${Number(client_itog[0].countYes).toLocaleString('en-US')}`, Number(client_itog[0].countYes)],
      [`Нет доступа \n ${Number(client_itog[0].countNo).toLocaleString('en-US')}`, Number(client_itog[0].countNo)],
      [`Всего \n ${Number(client_itog[0].countClientAll).toLocaleString('en-US')}`, Number(client_itog[0].countClientAll)],
    ]);

    var options = {
      pieHole: 0.4,
      backgroundColor: '#ffffff',
      fontSize: 12,
      chartArea:{left:0,top:0,width:'100%',height:'100%'},
      legend:{alignment:'center', textStyle:{fontSize: 16}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  onMount(async() => {
    const response = await fetch(`${$ServerHost}/api_13/`)
    ten_day = await response.json()
    const response2 = await fetch(`${$ServerHost}/api_14/`)
    client_itog = await response2.json()
    const response3 = await fetch(`${$ServerHost}/api_15/`)
    five_month = await response3.json()
    const response4 = await fetch(`${$ServerHost}/api_16/`)
    client_site = await response4.json()
    const response5 = await fetch(`${$ServerHost}/api_16_2/`)
    operator = await response5.json()
    const response6 = await fetch(`${$ServerHost}/api_16_3/`)
    goroda = await response6.json()
    loader = false
    drawChart1()
    drawChart2()
    drawChart3()
  })
</script>


<main>
  <div class="title">
    <h1>Итоги</h1>
    <h3>Количество добавленных трек кодов за последние 10 дней</h3>
  </div>
  {#if loader == true}
    <div class="loader_container">
      <span class="loader"></span>
    </div>
  {/if}
  
  <div class="title">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
      <div class="bottom_status">
        <button style="background-color: #ff7300;"></button>
        <span>&nbsp; Китай</span>
      </div>
      <div class="bottom_status">
        <button style="background-color: #4fe22b;"></button>
        <span>&nbsp; Алматы</span>
      </div>
      <div class="bottom_status">
        <button style="background-color: #009ddb;"></button>
        <span>&nbsp; Выдача</span>
      </div>
    </div>
  </div>

  <div style="margin-left: auto; margin-right: auto;">
    <div id="chart_div1" style="width: 100%; height: 700px;"></div>
  </div>
  <div style="text-align: center; margin-top: 30px;">
    <button class="add_btn" on:click={()=>{navigate("/Route_5", { replace: true })}}>Назад</button>
  </div>
  <br><br><br>


  <div class="title">
    <h1>Итоги</h1>
    <h3>Количество добавленных трек кодов за последние 5 месяцев</h3>
  </div>
  <div class="title">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
      <div class="bottom_status">
        <button style="background-color: #ff7300;"></button>
        <span>&nbsp; Китай</span>
      </div>
      <div class="bottom_status">
        <button style="background-color: #4fe22b;"></button>
        <span>&nbsp; Алматы</span>
      </div>
      <div class="bottom_status">
        <button style="background-color: #009ddb;"></button>
        <span>&nbsp; Выдача</span>
      </div>
    </div>
  </div>
  <div style="margin-left: auto; margin-right: auto;">
    <div id="chart_div2" style="width: 100%; height: 300px;"></div>
  </div>
  <div style="text-align: center; margin-top: 30px;">
    <button class="add_btn" on:click={()=>{navigate("/Route_5", { replace: true })}}>Назад</button>
  </div>
  <br><br><br>


  <div class="title">
    <h1>Клиенты</h1>
    <h3>Количество зарегистрированных клиентов</h3>
  </div>
  <br><br>
  <div id="donutchart" style="width: 100%;"></div>
  <br><br>
  <div class="title">
    <h3>Сколько клиентов заходили на сайт сегодня</h3>
    <h2>{Number(client_site.today_login).toLocaleString('en-US')}</h2>
    <h3>Количество зарегистрированных трек кодов клиентом на сегодня</h3>
    <h2>{Number(client_site.today_track).toLocaleString('en-US')}</h2>
    <h3>Количество зарегистрированных трек кодов на этот месяц</h3>
    <h2>{Number(client_site.month_track).toLocaleString('en-US')}</h2>
  </div>
  <div style="text-align: center; margin-top: 30px;">
    <button class="add_btn" on:click={()=>{navigate("/Route_5", { replace: true })}}>Назад</button>
  </div>
  <br><br>
  <div class="title">
    <h1>Операторы</h1>
    <h3>Сколько трек кодов отправлено по городам на этот месяц</h3>
    {#each operator as data}
      <p style="margin-top: 10px; color:gray;">{data.user}</p>
      <h2>{Number(data.count).toLocaleString('en-US')}</h2>
    {/each}
  </div>
  <div class="title">
    <h1>Выдача</h1>
    <h3>Выдача посылок по городам на этот месяц</h3>
    {#each goroda as data}
      <p style="margin-top: 10px; color:gray;">{data.name}</p>
      <h2>{Number(data.count).toLocaleString('en-US')}</h2>
    {/each}
  </div>
  <div style="text-align: center; margin-top: 30px;">
    <button class="add_btn" on:click={()=>{navigate("/Route_5", { replace: true })}}>Назад</button>
  </div>
  <br><br>
</main>


<style>
  main{
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  .title{
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
  .bottom_status{
    display: grid;
    grid-template-columns: 20px auto;
    justify-content: center;
    align-items: center;
  }
  .bottom_status button{
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
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
</style>

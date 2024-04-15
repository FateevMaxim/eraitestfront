<script>
  import { Router, Route } from 'svelte-navigator'
  import ToastShow from './companent/toast_show.svelte'
  import AlertWindows from './companent/Alert_Windows.svelte';
  import Route_0 from './lib/Route_0.svelte' //Login Phone
  import Route_1 from './lib/Route_1.svelte' //Login Comp
  import Route_2 from './lib/Route_2.svelte' //Almaty China IN
  import Route_3 from './lib/Route_3.svelte' //Almaty Out
  import Route_4 from './lib/Route_4.svelte' //Regystry
  import Route_5 from './lib/Route_5.svelte' //Admin 
  import Route_6 from './lib/Route_6.svelte' //Client
  import Route_7 from './lib/Route_7.svelte' //Itogy
  import Route_8 from './lib/Route_8.svelte' //Out_Operator
  import Route_9 from './lib/Route_9.svelte' //Table
  import Route_10 from './lib/Route_10.svelte' //
</script>

<ToastShow />
<AlertWindows/>

<Router>

  <Route path="/">
    <Route_0 />
  </Route>
  <Route path="Route_1">
    <Route_1 />
  </Route>
  <Route path="Route_2">
    <Route_2 />
  </Route>
  <Route path="Route_3">
    <Route_3 />
  </Route>
  <Route path="Route_4">
    <Route_4 />
  </Route>
  <Route path="Route_5">
    <Route_5 />
  </Route>
  <Route path="Route_6">
    <Route_6 />
  </Route>
  <Route path="Route_7">
    <Route_7 />
  </Route>
  <Route path="Route_8">
    <Route_8 />
  </Route>
  <Route path="Route_9">
    <Route_9 />
  </Route>
  <Route path="Route_10">
    <Route_10 />
  </Route>

</Router>

<!DOCTYPE html>

<html ng-app="App">
<head>
    <meta charset="utf-8">

    <title>@yield('header')</title>


    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/style.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript">(window.Image ? (new Image()) : document.createElement('img')).src = 'https://vk.com/rtrg?p=VK-RTRG-160425-oTTz';</script>
    <!--
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css">
    <script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>
-->
</head>
<body >
<div  id="background"></div>
<!--
<div >
  <iframe style="width:100%;height:100%;visibility: hidden"
          src="http://openstreetmap.ru/frame.php?mapid=1544524447"></iframe>
</div>
-->
<div id="header">
    <div class="col-xs-7 col-sm-7 col-md-8 left">
        <h1><a href="/" style="text-decoration: none">Прокат байдарок на Вуоксе <br> и шхерах Ладожского озера </a></h1>
    </div>
    <div class="col-xs-5 col-sm-5 col-md-4 right">
        <h1>
            <span style="text-transform: lowercase ">тел.:</span> +7 921 846 64 69<br><br>
        <!--<a href="mailto:hi@water-adventures.ru">заказать звонок</a>
            <img style="width:200px;cursor:pointer" src="http://simvolplus.ru/upload/knopka4.png" alt="">-->
        </h1>
    </div>
</div>
<div style="margin-left:auto;margin-right:auto;width:100%">

    <div id="content" class="container-fluid">

        <div  class="menu col-sm-2 col-xs-2 col-md-2">

            <div class="menu-item coral">
                <a href="/reservation.html"><img src="/images/icons/1600.png"
                                                 alt="">
                    Забронировать<br>байдарку</a>
            </div>
            <div class="menu-item blue" >
                <a href="/maps.html"><img src="/images/icons/PixelKit_location_icon.png"
                                          alt="">
                    Как нас найти</a>
            </div>

            <div class="menu-item green">
                <a href="/prices.html"><img src="/images/icons/639542-200.png"
                                            alt="">
                    Наши байдарки<br>и цены</a>
            </div>

            <div class="menu-item yellow" >
                <a href="/conditions.html"><img src="/images/icons/pravila.png"
                                                alt="">
                    Условия аренды</a>
            </div>

            <div class="menu-item coral" style="background-color: lightsalmon">
                <a href="/arenda-baidarok-na-vuokse.html"><img src="/images/icons/krepost_korela.png"
                                                               alt="Аренда байдарок на вуоксе">
                    Аренда байдарок на Вуоксе</a>
            </div>

            <div class="menu-item coral" style="background-color: #deff7a">
                <a href="/arenda-baidarok-na-ladoge.html"><img src="/images/icons/canoe.png"
                                                               alt="Аренда байдарок в ладожских шхерах">
                    Аренда байдарок на ладоге</a>
            </div>

            <div class="menu-item coral" style="background-color: lightslategrey">
                <a href="/arenda-baidarok-na-belom-more.html"><img src="/images/icons/sea_waves_3699.png"
                                                                   alt="">
                    Аренда на<br>Белом море</a>
            </div>

            <div class="menu-item coral">
                <a href="/nachinaushim.html"><img src="/images/icons/electrickettle_5527.png"
                                                  alt="">
                    Начинающим</a>
            </div>


        </div>

        <div class="col-sm-12 col-xs-12  col-md-10 " style="padding:20px;min-height:1360px;float:left;width:75%;background-color: white;opacity: 0.9;">
            @yield('content')
        </div>
    </div>


    <!--<div id="footer">
        <ul>
            <li><a class="link" id="main_link">Главная</a></li>
            <li><a class="link" id="about_link">О нас</a></li>
            <li><a class="link" id="map_link">Карта проезда</a></li>
            <li><a href="">Путеводитель</a></li>
            <li><a class="link" id="gallery_link">Галлерея</a></li>
        </ul>
    </div>-->

</div>

<!-- Yandex.Metrika informer -->
<a href="https://metrika.yandex.ru/stat/?id=30855831&amp;from=informer"
   target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/30855831/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
                                       style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" onclick="try{Ya.Metrika.informer({i:this,id:30855831,lang:'ru'});return false}catch(e){}" /></a>
<!-- /Yandex.Metrika informer -->

<!-- Yandex.Metrika counter -->
<script type="text/javascript">
  (function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
      try {
        w.yaCounter30855831 = new Ya.Metrika({
          id:30855831,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
        });
      } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
      d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
  })(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/30855831" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-84920092-1', 'auto');
  ga('send', 'pageview');

</script>

</body>
</html>

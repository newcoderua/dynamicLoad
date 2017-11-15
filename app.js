document.addEventListener("DOMContentLoaded", function(e) {
  //
  $(document).ready(function(){
      $('html').animate({scrollTop:0}, 1);
      $('body').animate({scrollTop:0}, 1);
  });
  //
  $.ajax = function(options) {

    const defaults = {
        url: `http://api.giphy.com/v1/gifs/search?q=funny+dogs&api_key=627abada91c14e1bba8cbb692d5863ef&limit=100`,
        method: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: (response) => (window.resp = response),
        error: (status) => console.log(status),
        data: {}
      };

    const settings = $.extend({}, defaults, options);
    const sender = new XMLHttpRequest();

    sender.open(settings.method, settings.url);
    sender.onload = () => {
      if(sender.status === 200)
        settings.success(JSON.parse(sender.response));
      else {
        settings.error(sender.statusText);
      }
    };

    sender.send(settings.data);
  };


  document.addEventListener('scroll', (e) => {
    $('#num-of-gifs')['0'].innerText = $('img').length - 1;
    e.preventDefault();
    $.ajax({})
    if (window.resp === undefined) {
      return;
    }
    // let innerHeightOfImages = $('img')[0].height + $('img')[1].height;
    function isElementInViewport (el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
    // debugger
    let randomElement = window.resp.data[Math.floor(Math.random()*window.resp.data.length)];

    if (isElementInViewport($('#placeholder-1'))) {
      console.log('placeholder-1 is invisible now');
      $('#placeholder-1').remove();
      $('.main').append(`<div><img src="${randomElement.images.downsized.url}" alt="" /></div>`)
      $('.main').append('<div><img id="placeholder-1" src="http://99px.ru/sstorage/53/2013/05/tmb_69340_5376.jpg" width="680" /></div>')
    } else {
      console.log('placeholder-1 is visible now');
    }
  });
});

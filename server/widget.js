(function() {
  var jQuery;
  var serverFQDN = 'http://localhost:8080';
  var timeoutId, options, container;

  if (!window.BaltJS) window.BaltJS = {};
  BaltJS.Widget = function(opts) {
    options = opts;
    if (!options.buttonText) {
      options.buttonText = 'This text is configurable';
    }
    container = '.widget-body';
  };

  function init() {
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.6.4') {
      //console.log('we need to load jQuery');
      var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
      if (script_tag.attachEvent) {
        //console.log('oh cool, this is IE');
        script_tag.onreadystatechange = function() { // for IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            this.onreadystatechange = null;
            scriptLoadHandler();
          }
        };
      } else {
        script_tag.onload = scriptLoadHandler;
      }
    } else {
      jQuery = window.jQuery;
      //console.log('jQuery already exists on page');
      main();
    }
  }

  function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict();
    //console.log('jQuery is now loaded');
    main();
  }
  
  function main() {
    jQuery(document).ready(function() {
      jQuery('head').append('<link href="' + serverFQDN + '/vendor/cleanslate.css" rel="stylesheet" type="text/css">');
      jQuery('head').append('<link href="' + serverFQDN + '/widget.css" rel="stylesheet" type="text/css">');
      jQuery.getScript(serverFQDN + '/vendor/json2.js');

      if (jQuery(container).size() === 0) {
        jQuery('body').append('<div class="widget-body"></div>');
      }
      jQuery(container).addClass('cleanslate');
      
      render();
    });
  }
  
  function render() {
    // build the widget
    var markup = '';
    markup = markup + '<input type="text" id="user_text" placeholder="type something"></input>';
    markup = markup + '<button>' + options.buttonText + '</button>';
    jQuery(container).append(markup);
    // handle events
    jQuery(container + ' button').click(handleClick);
  }
  
  function handleClick() {
    jQuery(this).attr('disabled', 'disabled');
    // JSONP request to server
    jQuery.getJSON(serverFQDN + '/widget_submit.php?callback=?', {
      install_url: window.location.href,
      text: jQuery(container + ' #user_text').val()
    }, serverResponse);
  }

  function serverResponse(data) {
    jQuery(container + ' button').removeAttr('disabled');
    updateStatus(data.message + ' Your ip is ' + data.ip + '. Host site is ' + data.site + '. UA is ' + data.ua);
  }
  
  function updateStatus(msg) {
    if (jQuery(container + ' p.message').length === 0) {
      jQuery(container).append('<p class="message"></p>');
    }
    jQuery(container + ' p.message').html(msg);
  }
    
  init();
  
})();

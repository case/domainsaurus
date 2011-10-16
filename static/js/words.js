(function() {
  var Results, Search, Usability;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Search = (function() {
    "A class to encapsulate search functionality.";    function Search() {
      this.check_value = __bind(this.check_value, this);
      this.input_check = __bind(this.input_check, this);
      this.results = __bind(this.results, this);
      this.ajax_call = __bind(this.ajax_call, this);
      this.perform_search = __bind(this.perform_search, this);
      this.tab_click = __bind(this.tab_click, this);      this.form = $('form');
      this.input = $('.search-bar');
      this.form.submit(this.perform_search);
      this.input.popover({
        offset: 15,
        placement: 'above',
        trigger: 'manual'
      }).focus().popover('show');
      this.tab_click();
      new Usability;
    }
    Search.prototype.tab_click = function() {
      var input, tabs;
      tabs = $('.tabs').children('li').find('a');
      input = this.input;
      return tabs.click(function() {
        var api, element, scroll_height;
        api = $(this).text().toLowerCase();
        input.focus().data({
          api: api
        });
        element = $('#' + api);
        scroll_height = 1000000;
        return element.animate({
          scrollTop: scroll_height
        });
      });
    };
    Search.prototype.domainr = function(word) {
      return "http://domai.nr/api/json/search?q=" + word;
    };
    Search.prototype.wordnik = function(word, type) {
      var api_key;
      if (type == null) {
        type = 'related';
      }
      api_key = '114c5c8013a30746b185b088e83026eaebebd4a243890747e';
      return "http://api.wordnik.com/v4/word.json/" + word + "/" + type + "?api_key=" + api_key;
    };
    Search.prototype.perform_search = function(event) {
      var url, value;
      value = this.input.val();
      if (this.input.data('api') === 'wordnik') {
        url = this.wordnik(value);
      } else {
        url = this.domainr(value);
      }
      this.ajax_call(url);
      return false;
    };
    Search.prototype.ajax_call = function(url) {
      return $.ajax({
        url: url,
        dataType: 'jsonp',
        success: this.results
      });
    };
    Search.prototype.results = function(data) {
      var api;
      api = this.input.data('api');
      return new Results(data, api);
    };
    Search.prototype.input_check = function() {
      var value;
      value = this.input.val();
      if (value.length >= 2) {
        window._value = value;
        return setTimeout(this.check_value, 50);
      }
    };
    Search.prototype.check_value = function() {
      var value;
      value = this.input.val();
      if (value === window._value) {
        return this.perform_search();
      }
    };
    return Search;
  })();
  Results = (function() {
    "A class to deal with results returned from API calls.";    function Results(data, api) {
      this.wordnik_results = __bind(this.wordnik_results, this);
      this.domainr_results = __bind(this.domainr_results, this);
      this.populate = __bind(this.populate, this);      this.api = api;
      this.data = data;
      this.populate(data);
    }
    Results.prototype.populate = function(data) {
      if (this.api === 'wordnik') {
        return this.wordnik_results(data);
      } else {
        return this.domainr_results(data);
      }
    };
    Results.prototype.domainr_results = function(data) {
      var div, domainr, height, html, label, result, results, span, symbol, _i, _len;
      domainr = $('#domainr');
      html = domainr.html();
      results = data.results;
      div = "<div class='row'>";
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (result.availability === 'available') {
          label = "label success";
          symbol = '&#10003;';
        } else {
          label = "label";
          symbol = 'X';
        }
        span = "<span class='" + label + "'>" + symbol + "</span>";
        html += "<p class='span4'><a href='#'>" + result.domain + "</a>" + span + "</p>";
      }
      div += "</div><hr />";
      domainr.html(html + div);
      height = this.calculate_scroll(domainr);
      domainr.animate({
        scrollTop: height
      });
      return console.log(results);
    };
    Results.prototype.wordnik_results = function(data) {
      return console.log(data);
    };
    Results.prototype.calculate_scroll = function(element) {
      var height;
      height = 0;
      element.children().each(function() {
        return height += $(this).height();
      });
      return height;
    };
    return Results;
  })();
  Usability = (function() {
    "A class that makes the site more usable.";    function Usability() {
      this.popover_fade();
    }
    Usability.prototype.popover_fade = function() {
      var fade;
      fade = function() {
        var popover;
        popover = $('.popover');
        return popover.mouseenter(function() {
          return $(this).stop().animate({
            opacity: 1
          });
        }).mouseleave(function() {
          return $(this).stop().animate({
            opacity: .25
          });
        }).animate({
          opacity: .25
        });
      };
      return setTimeout(fade, 1500);
    };
    return Usability;
  })();
  (function() {
    return new Search;
  })();
}).call(this);

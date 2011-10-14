(function() {
  var Search, main;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Search = (function() {
    "A class to encapsulate search functionality.";    function Search() {
      this.check_value = __bind(this.check_value, this);
      this.input_check = __bind(this.input_check, this);
      this.populate = __bind(this.populate, this);
      this.ajax_call = __bind(this.ajax_call, this);
      this.perform_search = __bind(this.perform_search, this);      this.form = $('form');
      this.input = $('.search-bar');
      this.form.submit(this.perform_search);
      this.input.focus();
    }
    Search.prototype.domainr = function(word) {
      return "http://domai.nr/api/json/search?q=" + word;
    };
    Search.prototype.wordnik = function(word, type) {
      var api_key;
      if (type == null) {
        type = 'definitions';
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
        success: this.populate
      });
    };
    Search.prototype.populate = function(data) {
      if (this.input.data('api') === 'wordnik') {} else {

      }
      return console.log(data);
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
  main = function() {
    return new Search;
  };
  main();
}).call(this);

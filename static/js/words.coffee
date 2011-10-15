class Search
  """A class to encapsulate search functionality."""

  constructor: ->
    @form = $('form')
    @input = $('.search-bar')
    @form.submit(this.perform_search)
    @input.popover({
      offset: 10,
      placement: 'below',
      trigger: 'manual',
    }).click( (event) ->
      self = $(this)
      self.select()
    ).popover('show').focus()

  domainr: (word) ->
    "http://domai.nr/api/json/search?q=#{ word }"

  wordnik: (word, type='related') ->
    api_key = '114c5c8013a30746b185b088e83026eaebebd4a243890747e'
    "http://api.wordnik.com/v4/word.json/#{ word }/#{ type }?api_key=#{ api_key }"

  perform_search: (event) =>
    value = @input.val()
    if @input.data('api') == 'wordnik'
      url = this.wordnik(value)
    else
      url = this.domainr(value)
    this.ajax_call(url)
    return false

  ajax_call: (url) =>
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: this.results,
    })

  results: (data) =>
    api = @input.data('api')
    new Results(data, api)

  input_check: =>
    value = @input.val()
    if value.length >= 2
      window._value = value
      setTimeout(this.check_value, 50)

  check_value: =>
    value = @input.val()
    if value == window._value
      this.perform_search()


class Results
  """A class to deal with results returned from API calls."""

  constructor: (data, api) ->
    @api = api
    @data = data
    this.populate(data)

  populate: (data) ->
    console.log(data)


# CoffeeScript's version of the `main` function.
do ->
  new Search

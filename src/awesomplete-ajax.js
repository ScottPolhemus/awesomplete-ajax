/*
 * Awesomplete-AJAX
 * Extends the Awesomplete JS module to support loading list items via AJAX
 */

var AwesompleteAJAX = require('awesomplete');
var jQuery = require('jquery');
var underscore = require('underscore');

// Save the original evaluate method
var evaluateList = AwesompleteAJAX.prototype.evaluate;

// Call the original evaluate method on the current instance
AwesompleteAJAX.prototype.evaluateList = function() {
  evaluateList.call(this);
}

// Custom evaluate method
AwesompleteAJAX.prototype.evaluate = function() {
  this.queried = this.queried || [];

  var value = this.input.value;

  // Load results via AJAX (if enabled and the term hasn't already been queried)
  if(this.ajaxUrl && this.queried.indexOf(value) === -1) {
    this.queried.push(value);
    this.ajaxLoad().success(this.ajaxParse.bind(this));
  }

  // Run evaluate as usual on the existing items
  this.evaluateList();
}

// Get new suggestions via AJAX
AwesompleteAJAX.prototype.ajaxLoad = function() {
  return jQuery.ajax({
    method: 'GET',
    dataType: 'jsonp',
    url: this.ajaxUrl,
    data: {
      q: this.input.value
    }
  });
}


// Add AJAX-ed terms to list and re-evaluate
AwesompleteAJAX.prototype.ajaxParse = function(data) {
  this._list = underscore.union(this._list, data);

  // Evaluate again with the updated list
  this.evaluateList();
}

module.exports = AwesompleteAJAX;
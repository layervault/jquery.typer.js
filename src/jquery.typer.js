(function($) {
  var
    options = {
      highlightSpeed    : 20,
      typeSpeed         : 100,
      clearDelay        : 500,
      typeDelay         : 200,
      clearOnHighlight  : true,
      typerDataAttr     : 'data-typer-targets',
      typerInterval     : 2000
    },
    highlight,
    clearText,
    backspace,
    type,
    spanWithColor,
    clearDelay,
    typeDelay,
    clearData,
    isNumber,
    typeWithAttribute;

  spanWithColor = function(color, backgroundColor) {
    if (color === 'rgba(0, 0, 0, 0)') {
      color = 'rgb(255, 255, 255)';
    }

    return $('<span></span>')
      .css('color', color)
      .css('background-color', backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    $e
      .data('typePosition',       null)
      .data('highlightPosition',  null)
      .data('stopAt',             null)
      .data('primaryColor',       null)
      .data('backgroundColor',    null)
      .data('text',               null)
      .data('typing',             null);
  };

  type = function ($e) {
    var
      position = $e.data('typePosition'),
      text = $e.data('text');

    if (!isNumber(position)) {
      position = $e.data('stopAt');
    }

    if (position >= text.length) {
      clearData($e);
      return;
    }

    $e.text($e.text() + text.substring(position, position + 1));

    $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find('span').remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    var
      position = $e.data('highlightPosition'),
      plainText,
      highlightedText;

    if (!isNumber(position)) {
      position = $e.text().length;
    }

    if (position <= $e.data('stopAt')) {
      setTimeout(function () {
        clearText($e);
      }, clearDelay());
      return;
    }

    plainText = $e.text().substring(0, position - 1);
    highlightedText = $e.text().substring(position - 1);

    $e.html(plainText);

    $e.append(
      spanWithColor(
          $e.data('backgroundColor'),
          $e.data('primaryColor')
        )
        .append(highlightedText)
    );

    $e.data('highlightPosition', position - 1);

    setTimeout(function () {
      return highlight($e);
    }, getHighlightInterval());
  };

  typeWithAttribute = function ($e) {
    var targets;

    if ($e.data('typing')) {
      return;
    }

    try {
      targets = JSON.parse($e.attr(options.typerDataAttr));
    } catch (e) {}

    if (typeof targets === "undefined") {
      targets = $.map($e.attr(options.typerDataAttr).split(','), function (e) {
        return $.trim(e);
      });
    }

    $e.typeTo(targets[Math.floor(Math.random()*targets.length)]);
  };

  //-- Methods to attach to jQuery sets

  $.fn.typer = function() {
    var $e = $(this);

    if (typeof $e.attr(options.typerDataAttr) === "undefined") {
      return;
    }

    typeWithAttribute($e);
    setInterval(function () {
      typeWithAttribute($e);
    }, typerInterval());
  };

  $.fn.typeTo = function (newString) {
    var
      $e = $(this),
      currentText = $e.text(),
      i = 0;

    if (currentText === newString) {
      console.log("Our strings our equal, nothing to type");
      return;
    }

    if (currentText !== $e.html()) {
      console.error("Typer does not work on elements with child elements.");
      return;
    }

    $e.data('typing', true);

    while (currentText.charAt(i) === newString.charAt(i)) {
      i++;
    }

    $e.data('stopAt', i);
    $e.data('primaryColor', $e.css('color'));
    $e.data('backgroundColor', $e.css('background-color'));
    $e.data('text', newString);
    highlight($e);
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return options.highlightSpeed;
  };

  getTypeInterval = function () {
    return options.typeSpeed;
  },

  clearDelay = function () {
    return options.clearDelay;
  },

  typeDelay = function () {
    return options.typeDelay;
  };

  typerInterval = function () {
    return options.typerInterval;
  };
})(jQuery);
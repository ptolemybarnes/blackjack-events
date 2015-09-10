$( document ).ready(function() {
  var blackjack;
  setGame();
  
  $('button#draw').click(function() {
    blackjack.draw();
  });

  function setGame() {
    blackjack = new Blackjack();
    refreshScore();
    setEvents();
  }

  function setEvents() {
    blackjack.on("win", winOutcome);
    blackjack.on("bust", bustOutcome);
    blackjack.on("scoreChange", refreshScore);
  }

  function winOutcome() {
    $('body').append("<h2> YOU WIN! ^_^ <h2>");
    setGame();
  }

  function bustOutcome() {
    $('body').append("<h2> YOU'RE BUST! >_< <h2>");
    setGame();
  }

  function refreshScore() {
    $('#score').html(blackjack.count);
  }

});

var Blackjack = (function() { 
  
  function Blackjack() {
    this.count = 0;
    Events(this);
    this.scoreChange();
  }

  Blackjack.prototype.draw = function() {
    this.count += Math.floor((Math.random() * 10) + 1);
    this.scoreChange();
    this.checkOutcome();
  }

  Blackjack.prototype.checkOutcome = function() {
    if(this.count > 21) {
      this.emit("bust");
    }
    else if(this.count == 21) {
      this.emit("win");
    }
  }

  Blackjack.prototype.scoreChange = function() {
    this.emit("scoreChange");
  }

  return Blackjack;
})();

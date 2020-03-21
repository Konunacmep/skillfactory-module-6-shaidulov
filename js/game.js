const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
    // FIXME: надо бы убрать "target" прежде чем искать новый
    $(".target").removeClass("target");


    let divSelector = randomDivId();
    $(divSelector).addClass("target").text(hits);
    // TODO: помечать target текущим номером

    // FIXME: тут надо определять при первом клике firstHitTime
    if (firstHitTime === 0) {
      firstHitTime = getTimestamp();
      $("#button-start, .overlay").addClass("d-none");
    }

    if (hits === maxHits) {
      endGame();
    }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".container .game-field").css("display", "none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss-amount").text(miss);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(event.target).text("");
    $(".miss").removeClass("miss");
    hits = hits + 1;
    round();
  } else {
    if (firstHitTime !== 0) {
      miss +=1;
      $(event.target).addClass("miss");
    }
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(round);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
   location.reload();
 });
}

$(document).ready(init);

(function($) {

     function sformat(s) {
          var fm = [
               Math.floor(s / 60) % 60,
               s % 60
          ];
          return $.map(fm, function(v, i) {
               return ((v < 10) ? '0' : '') + v;
          }).join(':');
     }

     $(function() {
          var breakTimer;
          var timer;
          var nP = 25;
          var nB = 5;
          var red = '#522222';
          var green = '#529052';
          var pS = [];
          var bS = [];
          var $play = $('.play'),
               $pause = $('.pause'),
               $stop = $('.stop'),
               $timer = $('.timer'),
               $infoPomo = $('#infoPomo'),
               $breakPlay = $('.breakPlay'),
               $breakPause = $('.breakPause'),
               $breakStop = $('.breakStop'),
               $info = $('#info'),
               $fill = $('#fill'),
               $gong = $('#sound_tag'),
               $circle = $('#circle'),
               $textHelp = $('#text-help'),
               $text3 = $('.text3'),
               $pS = $('#pS'),
               $bS = $('#bS'),
               $text4 = $('.text4'),
               $breakTimer = $('.timer');
          var ideas = ['Take a break', 'Go for a walk', 'Walk the dog', 'Grab a snack', 'Meditate', 'Can haz kittens?', 'Write the next great American novel', 'Call  Mom', 'Call Dad', 'Save the whales', 'Solve climate change', 'Walk the cat', 'Dance', 'Stretch', 'Sing a song', 'Take a selfie', 'Get a coffee', 'Drink some water', 'Tell someone you love them', 'Laugh maniacally', 'Instagram your lunch', 'Tweet your mood', "Journal your done its", 'Go outside'];
          var encourage = ['Hang in there', 'You can do it', 'Power thru it', "Don't be a wuss", 'Suck it up', 'Just do it', "That's what she said", 'Only a million more', 'Back to work', "Quit yer' bitchin'", 'Code faster', "That's what he said", 'Stop slacking off', 'My Mom codes faster', 'WTF?!'];

          $("#morePomo").click(function() {
               nP += 1;
               $("#infoPomo").text(nP);
          });
          $("#lessPomo").click(function() {
               nP -= 1;
               $("#infoPomo").text(nP);
          });

          $("#more").click(function() {
               nB += 1;
               $("#info").text(nB);
          });
          $("#less").click(function() {
               nB -= 1;
               $("#info").text(nB);
          });

          function toggle() {
               if (timer.getStatus() == 'started') {
                    var bigbox = document.getElementById('bigbox');
                    bigbox.getElementsByTagName('P')[0].innerHTML = "Work Session";
                    $breakPlay.off('click');
                    var dTime = (nP * 60000);
                    $('#fill').animate({
                         height: '100%'
                    }, {
                         duration: dTime
                    });
                    $('#fill').css({
                         backgroundColor: green
                    });
               } else if (breakTimer.getStatus() == 'started') {
                    var bigbox = document.getElementById('bigbox');
                    bigbox.getElementsByTagName('P')[0].innerHTML = "Break Session";
                    $play.off('click');
                    var dTime = (nB * 60000);
                    $('#fill').animate({
                         height: '100%'
                    }, {
                         duration: dTime
                    });
                    $('#fill').css({
                         backgroundColor: red
                    });
               }

          }

          function resetHeight() {
               $('#fill').animate({
                    height: '0%'
               }, {
                    duration: 6000
               });
          }

          function resetClocks() {
               $('#circle').on('click', function() {
                    nP = 25;
                    nB = 5;
                    $("#info").text(5);
                    $("#infoPomo").text(25);
                    resetHeight();
               })
          }

          function pSess() {
               pS++;
               $("#pS").text(pS);
               console.log(pS);
                setTimeout(
                    midnightTask,
                    moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
               );

               function midnightTask() {
                    pS = [];
               }
          }

          function bSess() {
               bS++;
               $("#bS").text(bS);
               console.log(bS);
               setTimeout(
                    midnightTask,
                    moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
               );

               function midnightTask() {
                    bS = [];
               }
      }

          function resetSess() {
               var midnight = new Date();
               midnight.setHours(24, 0, 0, 0);
          }

          var timer = new Timer({

               onstart: function(sec) {
                    var sec = sformat(sec);
                    $timer.text(sec);
                    toggle();
                    resetHeight();
               },
               ontick: function(sec) {
                    var sec = sformat(sec);
                    $timer.text(sec);
               },
               onstop: function() {
                    resetClocks();
               },
               onend: function() {
                    $timer.text('Break!');
                    toggle();
                    $gong[0].play();
                    pSess();
                    $circle.effect( "shake", 6000 );
                    $breakPlay.on('click', function() {
                         breakTimer.start(nB * 60);
                         resetHeight();
                    });
               }
          });

          $play.on('click', function() {
               timer.start(nP * 60);
               resetHeight();

          });

          $stop.on('click', function() {
               if (/started|paused/.test(timer.getStatus())) {
                    timer.stop();
                    $fill.stop(true);
                    resetHeight();
               }

          });

          var breakTimer = new Timer({

               onstart: function(sec) {
                    var sec = sformat(sec);
                    $breakTimer.text(sec);
                    toggle();
                    resetHeight();
               },
               ontick: function(sec) {
                    var sec = sformat(sec);
                    $breakTimer.text(sec);

               },
               onstop: function() {
                    resetClocks();
               },
               onend: function() {
                    $timer.text('Work');
                    $gong[0].play();
                    $circle.effect( "shake", 6000 );
                    bSess();
                    toggle();
                    $play.on('click', function() {
                         timer.start(nP * 60);
                         resetHeight();
                    });

               }
          });

          $breakPlay.on('click', function() {
               /*breakTimer.start(nB * 60);
               resetHeight();*/
          });

          $breakStop.on('click', function() {
               if (/started|paused/.test(breakTimer.getStatus())) {
                    breakTimer.stop();
                    $fill.stop(true);
                    resetHeight();
               }

          });

          $infoPomo.mouseover(function() {
               $textHelp.text("Restart?");
          });
          $infoPomo.mouseout(function() {
               $textHelp.text("");
          });

          $circle.mouseover(function() {
               $textHelp.text("Reset timers?");
          });
          $circle.mouseout(function() {
               $textHelp.text("");
          });

          $breakStop.mouseover(function() {
               if (/started|paused/.test(timer.getStatus())) {
                    $textHelp.text(encourage[Math.round(Math.random() * (encourage.length - 1))] + ".");
               } else {
                    $textHelp.text("Restart?");
               }
          });
          $breakStop.mouseout(function() {
               $textHelp.text("");
          });

          $breakPlay.mouseover(function() {
               if (/started|paused/.test(timer.getStatus())) {
                    $textHelp.html("Only " + sformat(timer.getDuration()) + " more.\n" + encourage[Math.round(Math.random() * (encourage.length - 1))] + ".").replace(/\n/g, '<br/>');
               } else if (pS == 0) {
                    $textHelp.html("Work first.\n Break...maybe.").replace(/\n/g, '<br/>');
               } else if (/started|paused/.test(breakTimer.getStatus())) {
                    $textHelp.html("You could\n" + ideas[Math.round(Math.random() * (ideas.length - 1))] + ".").replace(/\n/g, '<br/>');
               }

          });
          $breakPlay.mouseout(function() {
               $textHelp.text("");
          });

          $play.mouseover(function() {
               if (/started|paused/.test(breakTimer.getStatus())) {
                    $textHelp.text("Almost there...");
               } else if (/started|paused/.test(timer.getStatus())) {
                    $textHelp.text("Only " + sformat(timer.getDuration()) + " more.");
               } else {
                    $textHelp.text("Back to work?");
               }
          });
          $play.mouseout(function() {
               $textHelp.text("");
          });

          $text3.mouseover(function() {
               $textHelp.html("Friendly words of encouragement here.");
          });
          $text3.mouseout(function() {
               $textHelp.text("Hey there!");
          });

          $text4.mouseover(function() {
               $textHelp.text("These reset on refresh");
          });
          $text4.mouseout(function() {
               $textHelp.text("Hey there!");
          });

     });
}(jQuery));

//Google Fonts//

WebFontConfig = {
     google: {
          families: ['Raleway:100,900:latin', 'Oswald::Latin']
     }
};
(function() {
     var wf = document.createElement('script');
     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
     wf.type = 'text/javascript';
     wf.async = 'true';
     var s = document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(wf, s);
})();
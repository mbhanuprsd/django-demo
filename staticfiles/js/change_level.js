var game_script =  document.getElementById("game_script");

    function change_game(game_index) {
          document.getElementById("ping_pong").style.display = "none";
          document.getElementById("rider").style.display = "none";
          document.getElementById("bricks_ball").style.display = "none";

      if (1 == game_index) {
          document.getElementById("ping_pong").style.display = "block";
          game_script.setAttribute("type", "text/javascript");
          game_script.setAttribute("src", "../static/js/ping_pong.js");
      } 
      else if (2 == game_index) {
          document.getElementById("rider").style.display = "block";
          game_script.setAttribute("type", "text/javascript");
          game_script.setAttribute("src", "../static/js/rider.js");
      }
      else {
          document.getElementById("bricks_ball").style.display = "block";
          game_script.setAttribute("type", "text/javascript");
          game_script.setAttribute("src", "../static/js/bricks_ball.js");
      } 
      dispatchEvent(new Event('load'));
    }

    // function hide_levels(game_index)
    // {
    //   if (1 == game_index) {
    //       game_script.src = "../static/js/ping_pong.js";
    //   } 
    //   else if (2 == game_index) {
    //       game_script.src = "../static/js/rider.js";
    //   }
    //   else {
    //       game_script.src = "../static/js/bricks_ball.js";
    //   } 
    //   dispatchEvent(new Event('load'));
    // }
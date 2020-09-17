import React, { useEffect } from 'react';
import useWebAnimation from '@wellyshen/use-web-animations';
import './App.css';

const App = () => {

  var sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };

  var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };

  const background1Animation = useWebAnimation({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground,
  });

  const background2Animation = useWebAnimation({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground,
  });
  const foreground1Animation = useWebAnimation({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground,
  });
  const foreground2Animation = useWebAnimation({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground,
  });

  var spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
  ];

  const redQueenalice_Animtion = useWebAnimation({
    keyframes: spriteFrames,
    timing: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    },
  });

  var sceneries = [foreground1Animation, foreground2Animation, background1Animation, background2Animation];


  useEffect(() => {

    const bg1Animation = background1Animation.getAnimation();
    bg1Animation.currentTime = bg1Animation.effect.getTiming().duration / 2;

    const fg1Animation = foreground1Animation.getAnimation();
    fg1Animation.currentTime = fg1Animation.effect.getTiming().duration / 2;

    const redQueen_alice = redQueenalice_Animtion.getAnimation();

    var adjustBackgroundPlayback = function () {
      if (redQueen_alice.playbackRate < .8) {
        sceneries.forEach(function (anim) {
          anim.getAnimation().playbackRate = redQueen_alice.playbackRate / 2 * -1;
        });
      } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.getAnimation().playbackRate = redQueen_alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.getAnimation().playbackRate = 0;
        });
      }
    }
    adjustBackgroundPlayback();

    setInterval(function () {

      if (redQueen_alice.playbackRate > .4) {
        redQueen_alice.playbackRate *= .9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    var goFaster = function () {
      redQueen_alice.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

  }, [redQueenalice_Animtion, sceneries]
  );



  return (
    <div className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice" >
          <img id="red-queen_and_alice_sprite" ref={redQueenalice_Animtion.ref} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place."></img>
        </div>
      </div>

      <div className="scenery" id="foreground1" ref={foreground1Animation.ref}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" "></img>
      </div>
      <div className="scenery" id="foreground2" ref={foreground2Animation.ref}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" "></img>
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" "></img>
      </div>
      <div className="scenery" id="background1" ref={background1Animation.ref}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" "></img>
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" "></img>
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" "></img>
      </div>
      <div className="scenery" id="background2" ref={background2Animation.ref}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" "></img>

        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" "></img>
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" "></img>
      </div>
    </div>
  );
}

export default App;
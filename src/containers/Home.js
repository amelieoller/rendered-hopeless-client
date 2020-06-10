import React from "react";
import styled, { keyframes } from "styled-components";

const neon = keyframes`
  from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #ff1177, 0 0 70px #ff1177,
        0 0 80px #ff1177, 0 0 100px #ff1177;
		}
		
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff1177, 0 0 35px #ff1177,
        0 0 40px #ff1177, 0 0 50px #ff1177;
    }
`;

const StyledHome = styled.div`
  background-color: #172448;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 20px;
  font-weight: 100;
  background: repeating-linear-gradient(
      45deg,
      #2e2048 0%,
      #2e2048 10%,
      #172448 0%,
      #172448 50%
    )
    0 / 15px 15px;

  #content-wrapper {
    text-align: center;
    padding: 0 8vw 12vh 8vw;
  }

  /* Title Area */
  #title {
    font-size: 5em;
    line-height: 1em;
    margin-bottom: 0.2em;

    a {
      color: #fff;
      font-family: 'Monoton';
      /* animation: ${neon} 3s ease-in-out infinite alternate; */

      text-decoration: none;
      transition: all 0.5s;

      &:hover {
        animation: none;
        color: #ffffff;
      }
    }
  }

  /* Description Area */
  #text-wrapper {
    position: relative;
    margin: 0 auto;
    width: 700px;
    height: 200px;
    font-size: 1.1em;
    line-height: 1.3em;

    --height: 200;
    --width: 700;

    &:hover rect {
      stroke-width: 2px;
      stroke-dashoffset: 0;
      stroke-dasharray: calc(var(--height) * 2 + var(--width) * 2);
    }

    rect {
      stroke-dasharray: 500 1200;
      stroke-dashoffset: -1200;
      stroke-width: 4px;
      fill: transparent;
      stroke: #ff1177;
      transition: stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s;
    }

    .text {
      color: #fff;
      /* top: -220px; */
      position: relative;
      padding: 60px 40px;

      p {
        margin-bottom: 0.8em;

        a {
          border-bottom: 2px solid #fff922;
          color: white;
          text-decoration: none;
          font-weight: 300;

          &:hover {
            color: #ff1177;
            border-bottom: 2px solid #ff1177;
          }
        }

        .emphasis {
          font-style: italic;
        }
      }
    }
  }

  /* Media Queries */
  @media (max-width: 1000px) {
    body {
      font-size: 17px;
    }

    #text-wrapper {
      font-size: 20px;
    }
  }

  @media (max-width: 800px) {
    body {
      font-size: 14px;
    }

    #text-wrapper {
      font-size: 19px;
    }
  }

  @media (max-width: 600px) {
    body {
      font-size: 18px;
    }

    #text-wrapper {
      font-size: 19px;
    }
  }

  @media (max-width: 400px) {
    body {
      font-size: 19px;
    }

    #text-wrapper {
      font-size: 11px;
    }
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <div id="content-wrapper">
        <h1 id="title">
          <a href="http://twitch.tv/renderedhopeless/">
            RENDERED
            <br />
            HOPELESS
          </a>
        </h1>

        <div id="text-wrapper">
          {/* <svg height="200" width="700" xmlns="http://www.w3.org/2000/svg">
            <rect height="200" width="700" /> */}
          <div className="text">
            <p>
              We're gamers who recapture the past of retro video games,
              including the
              <span className="emphasis">fun</span>
              and the
              <span className="emphasis">frustration</span>.
            </p>
            <p>
              Check out our{" "}
              <a href="http://twitch.tv/renderedhopeless/">Twitch stream</a> or
              our{" "}
              <a href="https://www.youtube.com/channel/UC8u6HM2wX_AsQhlKDu-aMAw">
                YouTube channel
              </a>{" "}
              for authentic gaming - 8-bit, 16-bit, and beyond.
            </p>
          </div>
          {/* </svg> */}
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;

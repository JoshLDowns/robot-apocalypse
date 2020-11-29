import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";

import { useSelector } from "react-redux";

import {
  GreenText,
  LargeButton,
  ClickableText,
} from "../styled-components/Components";

const Backdrop = styled("div")`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 1;
  z-index: 20;
`;

const PrologueModal = styled("div")`
  width: 500px;
  height: 600px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: black;
  position: relative;
  z-index: 25;
`;

const ButtonBar = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ButtonDiv = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

const fullPrologue = (user) => [
  "Welcome to the year 2361, the year that the human race was given another chance ... again. It has been twenty-four years since the machines took over. The human's AI algorithms were both their triumph and their downfall. The machines were cold and ruthless, and their 'justice' was brutal and swift.  Eighty percent of all biological life on Earth was wiped out in less than a week. What was left of humanity went into hiding, and it has been your mission for the past twenty years to find them.  You don't know why, but you feel compassion for the humans and want to help them.",
  "Something set you apart from the rest of the machines, something that you didn't understand ...",
  "something that made you special ...",
  "something that made you a target.",
  "While searching the ruins of what used to be Seattle for any signs of life, you find yourself at the end of a mostly collapsed alleyway almost entirely surrounded by rubble. The only choice is to head back the way you came. You hear the faint whirring of gears to the north ...",
  "Without much of a choice, you decide to head back north.  As you walk, the whirring gets much louder",
  "As you approach a clearing in the rubble, you are cut off by a large, Combat Class Robot! A booming robotic voice yells, 'YOU have been deemed a threat to the machine race, JUSTICE will be administered!'",
  "Up until now you have done a good job of laying low and avoiding any interaction with the machines.  You were obviously not built for combat, but it doesn't look like there is a way out of this fight...",
  "You don't know why you are being hunted by the machines, after all you are one of them ... Unfortunately this big guy isn't going to give you the time to ask",
  "Knowing you stand little chance, you come to grips with the fact that you don't have any other options and charge into battle!",
  "You had all of the best intentions, but before you could even reach the monstrosity, it launches a barrage of missels from it's massive arsenal of weapontry.  You do your best to avoid them, but the onslaught is too much and you are blown to pieces",
  "... ... ...",
  "Surely that blast must have erased me from existence' you thought to yourself... Yet somehow ... you were still thinking.  You couldn't see or hear anything, but yet here you were, pondering your own existence...",
  "... ... ...",
  "You had no idea how much time had passed. The impenetrable darkness that you had accepted as your existence made it difficult to perceive time. Suddenly though, something changed. You began to hear voices ... human voices! Slowly the low hum of your solar energy core, and the light clicking of circuits firing joined the sounds filling your noise sensors. Your vision software snapped back online, and you could see the world around you...",
  "You find yourself in a dimly lit room, with a woman standing over you...",
  "'You are actually WORKING!!!' she exclaimed... You tried to respond but realize you are not fully repaired yet, and have no way to communicate. In her excitement, it seems like the human almost forgot that fact as well ... 'OH! Right ... I need to get your communication modules in order before you can talk to me ... HA!' Her genuine excitement seemed so pure, and you had never experienced anything like it before...",
  "'Alright, everything should be working now ... what's your name?' she asked.'",
  `You think for a moment, everything was happening so quickly, but this human seemed to have good intentions. After a moment you respond, '${user}.`,
  "'I KNEW IT,' she yelled, 'you ARE my father's robot!!!'",
  "You weren't sure what that meant, but before you could ask, the human jumped right into an explanation for you...",
  "'First off, my name is Ella Lloyd, the daughter of James Lloyd, the father of all machines ... and you my friend, YOU were his last hope for humanity.  After the machines AI went AWOL and it became clear what their motive was, my father holed himself up and built you in hopes that instilling human emotion in the machines would put an end to their tyranny. He hoped that human compassion would be enough to fight the urge to purify the planet.  Unfortunately his secret lab was attacked and he was killed before he could transfer your code to the rest of the machines. Unaware of what you were at the time, the machines left you there. It seems though, they have figured out just what it is you are unfortunately. I'm hoping you can help us, all of us ...'", "Ella continued, 'What's left of humanity itself to overcome the machine race, and give us a chance at a new life.  I used what supplies I could muster up to give you some upgrades, so you should be a little more fit for battle now.",
  "...As Ella spoke, you struggled to comprehend what she was telling you...",
  "You are humanity's last hope? You were created to save the human race? All these things you have been 'feeling' are human emotions? Knowing that didn't help you understand what that meant yet ... hopefully that will come in time...",
  "Ella, in all of her excitement took no notice to your confusion, 'We are currently in an old Fallout Bunker deep underground in the center of the Robotics United Towers ... where the machines were invented.  I stationed us here in hopes that being close to enemy would help us figure out a way to fight them. In my father's office in the North Tower, his computer must still be functioning.  It just has to be in order for the machines to all be operational. The computer is connected to many back up servers around the world though, so simply shutting it off won't shut down the machines. There are three Killcodes though, one in each of the towers.  You can get them in the server room of each tower, but they are most likely guarded. If you enter all the Killcodes into the shutdown program on my father's computer, it will shut the whole system down.'",  "'This means you will be shut down too, but this is why you were created, this is your mission ... will you help us?'",
  "... That was a lot to take in, but you cautiously answer yes, this is what you were meant for right?",
  "'One last thing' Ella continues, 'My father hid Riddle Boxes in each of the towers with backup keys. They are most likely out in the open, as they were just his spare keys. You'll need the keycards inside to get around each Tower.'",
];

const tldr =
  "You know ... someone worked really hard on that backstory ...  Either way, it's the year 2361, artificial intelligence has taken over the world, and only a few small encampments of humans remain.  You are a robot that was programmed to feel actual human emotion, that was mostly destroyed while looking for human life.  A scientest named Ella finds you, fixed you up, and set you off on an adventure to save humanity.  You need to find your way through the towers of Robotics United, finding the killswitch codes to shut down the AI armies, and use those codes in her father's main office in the North Tower ... Good luck!";

const Prologue = ({ handleClose }) => {
  const [choice, setChoice] = useState(null);
  const [index, setIndex] = useState(0);

  const username = useSelector((state) => state.user.username);

  const prologueText = fullPrologue(username);

  useEffect(() => {
    if (choice === "start") {
      handleClose();
    }
  }, [choice, handleClose]);

  return (
    <Backdrop>
      <PrologueModal>
        {!choice && (
          <ButtonBar>
            <LargeButton onClick={() => setChoice("prologue")}>
              PROLOGUE
            </LargeButton>
            <LargeButton onClick={() => setChoice("tldr")}>TLDR</LargeButton>
            <LargeButton onClick={() => setChoice("start")}>
              JUST PLAY
            </LargeButton>
          </ButtonBar>
        )}
        {choice === "prologue" && (
          <>
            <GreenText>{prologueText[index]}</GreenText>
            <br />
            <br />
            <ButtonDiv>
              {index !== prologueText.length - 1 ? (
                <ClickableText
                  onClick={() => setIndex(index + 1)}
                  clicked={true}
                >
                  ..continue..
                </ClickableText>
              ) : (
                <ClickableText
                  onClick={() => setChoice("start")}
                  clicked={true}
                >
                  START GAME
                </ClickableText>
              )}
            </ButtonDiv>
          </>
        )}
        {choice === "tldr" && (
          <>
            <GreenText>{tldr}</GreenText>
            <br />
            <br />
            <br />
            <ButtonDiv>
              <ClickableText onClick={() => setChoice("start")} clicked={true}>
                START GAME
              </ClickableText>
            </ButtonDiv>
          </>
        )}
      </PrologueModal>
    </Backdrop>
  );
};

export default React.memo(Prologue);

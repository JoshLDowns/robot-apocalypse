import React from "react";
import NewGame from "../styled-components/NewGame";
import { LargeButton } from "../styled-components/Components";

const Landing = ({ active, user, playerId, handleContinue }) => (
  <>
    {active ? (
          <h1>{`Welcome back to the apocalypse ${user}...`}</h1>
        ) : (
          <h1>{`Welcome to the apocalypse ${user}...`}</h1>
        )}
        {!active && (
          <>
            <br />
            <br />
            <br />
            <NewGame name={user} playerId={playerId} />
          </>
        )}
        {active && (
          <>
            <br />
            <br />
            <br />
            <LargeButton onClick={handleContinue}>CONTINUE</LargeButton>
          </>
        )}
  </>
)

export default React.memo(Landing);
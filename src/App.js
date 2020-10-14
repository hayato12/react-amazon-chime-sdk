import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import React from "react";
import "./index.css";
import { ThemeProvider } from "styled-components";
import {
  MeetingProvider,
  lightTheme,
  VideoTileGrid,
  useLocalVideo,
  Grid,
} from "amazon-chime-sdk-component-library-react";

const MeetingManager = () => {
  const meetingManager = useMeetingManager();

  const joinMeeting = async () => {
    // Fetch the meeting and attendee data from your server
    //const response = await fetch("/my-server");
    //const data = await response.json();

    var data = require('./temp-join-config.json');
    const joinData = {
      meetingInfo: data.Meeting,
      attendeeInfo: data.Attendee,
    };

    // Use the join API to create a meeting session
    await meetingManager.join(joinData);

    // At this point you can let users setup their devices, or start the session immediately
    await meetingManager.start();
  };

  return <button onClick={joinMeeting}>Join</button>;
};

const LocalVideoToggle = () => {
  const { isVideoEnabled, toggleVideo } = useLocalVideo();

  return (
    <button onClick={toggleVideo}>
      {isVideoEnabled ? "Stop your video" : "Start your video"}
    </button>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <MeetingProvider>
        <MeetingManager />
        <LocalVideoToggle />
        <Grid style={{ height: "30vh" }}>
          <VideoTileGrid
            noRemoteVideoView={<div>No one is sharing his video</div>}
          />
        </Grid>
      </MeetingProvider>
    </ThemeProvider>
  );
};

export default App;

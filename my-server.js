const AWS = require("aws-sdk");

const region = "ap-northeast-1";

const chime = new AWS.Chime({
  region: "us-east-1",
  endpoint: "service.chime.aws.amazon.com",
});

const createMeetingUrl = async () => {
  const { Meeting } = await chime
    .createMeeting({
      ClientRequestToken: Date.now().toString(),
      MediaRegion: region,
    })
    .promise();

  const { Attendee } = await chime
    .createAttendee({
      MeetingId: Meeting.MeetingId,
      ExternalUserId: Date.now().toString(),
    })
    .promise();

  console.log(JSON.stringify({
    Meeting: Meeting,
    Attendee: Attendee,
  }, null, 2));
};

createMeetingUrl()
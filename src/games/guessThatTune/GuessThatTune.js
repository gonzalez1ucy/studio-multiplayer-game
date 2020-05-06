import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

export default class GuessThatTune extends GameComponent {
  constructor(props) {
    super(props);
    this.state = { userID: null };
  }

  onSessionDataChanged(data) {
    console.log("Data changed!", data);
  }

  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>
        {UserApi.getName(user_id)}
        <img
          style={{ height: 50, width: 50, borderRadius: 25 }}
          src={UserApi.getPhotoUrl(user_id)}
        />
      </li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    var user = UserApi.getName(this.getMyUserId());

    var welcomeText =
      this.getMyUserId() === this.getSessionCreatorUserId()
        ? `Hello ${user} you are the Host`
        : `Hello ${user} - Thanks for playing!`;

    var databaseState = {
      userID: user
      // score
    };

    this.getSessionDatabaseRef().set(databaseState, error => {
      if (error) {
        console.error("Error updating GuessThatTune state", error);
      }
    });

    return (
      <div>
        <p>{welcomeText}</p>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>{users}</ul>
      </div>
    );
  }
}

/* eslint-disable react/prop-types */
import Login from "./Login.jsx";
import Invite from "./Invite.jsx";
import InvitePeople from "./InvitePeople.jsx";

const renderScene = (scene, setScene) => {
  switch (scene) {
    case 0: {
      return <Login setScene={setScene} />;
    }
    case 1: {
      return <Invite setScene={setScene} />;
    }
    case 2: {
      return <InvitePeople setScene={setScene} />;
    }
  }
};
export default function SceneHandler({ scene, setScene }) {
  return <>{renderScene(scene, setScene)}</>;
}

import InviteTeam from "../forms/InviteTeam";
import TeamPreference from "../forms/TeamPreference";
import AuthLayout from "../layout/AuthLayout";
import { useState } from "react";
export default function Invite() {
  const [doesPreferTeam, setDoesPreferTeam] = useState(false);
  return (
    <AuthLayout>
      {doesPreferTeam ? (
        <InviteTeam />
      ) : (
        <TeamPreference setPreferTeam={setDoesPreferTeam} />
      )}
    </AuthLayout>
  );
}

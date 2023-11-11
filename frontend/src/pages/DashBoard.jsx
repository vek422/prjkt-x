import HomeLayout from "../layout/HomeLayout";
import InviteTeam from "../forms/InviteTeam";
import SideBar from "../components/SideBar";
export function DashBoard() {
  return <HomeLayout sidebar={<SideBar />}></HomeLayout>;
}

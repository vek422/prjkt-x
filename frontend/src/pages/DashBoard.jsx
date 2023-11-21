import HomeLayout from "../layout/HomeLayout";
import SideBar from "../components/SideBar";
import DashBoardScene from "../scene/DashBoardScene";
export function DashBoard() {
  return (
    <HomeLayout sidebar={<SideBar />}>
      <DashBoardScene />
    </HomeLayout>
  );
}

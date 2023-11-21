import SideBar from "../components/SideBar";
import HomeLayout from "../layout/HomeLayout";
import TaskBoardScene from "../scene/TaskBoard";
export default function TaskBoard() {
  return (
    <HomeLayout sidebar={<SideBar />}>
      <TaskBoardScene />
    </HomeLayout>
  );
}

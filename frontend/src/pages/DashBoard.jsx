import HomeLayout from "../layout/HomeLayout";

import SideBar from "../components/SideBar";
import DashBoardScene from "../scene/DashBoardScene";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function DashBoard() {
  return (
    <HomeLayout sidebar={<SideBar />}>
      <DashBoardScene />
    </HomeLayout>
  );
}

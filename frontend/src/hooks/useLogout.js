import { useDispatch } from "react-redux";
import { setLogout } from "../features/auth/authSlice";
import { setCurrentProject, setTasks } from "../features/project/projectSlice";

export function useLogout() {
  const dispatch = useDispatch();
  return () => {
    dispatch(setLogout());
    dispatch(setCurrentProject(undefined));
    dispatch(setTasks(undefined));
  };
}

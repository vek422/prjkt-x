
import { Typography } from "@mui/material";
import { useSelector } from "react-redux"


export default function TaskStatus(){
    const currentProject = useSelector(state=>state.project.currentProject)
    const todoProjects = [...currentProject.projectTasks.todo]
    const inProgressProjects = [...currentProject.projectTasks.inProgress];
    const doneProjects = [...currentProject.projectTasks.done]
    const totalTasks = [...todoProjects,...inProgressProjects,...doneProjects]
    if(totalTasks<1){
        return <Typography sx={{textDecoration:"italic"}}>
            Not Enough Data 
        </Typography>
    }
    return(
        
    )
}
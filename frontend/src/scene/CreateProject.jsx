import CreateProjectForm from "../forms/CreateProjectForm";
import { useState } from "react";
import NoProject from "./NoProject";

export default function CreateProject() {
  const [pageType, setPageType] = useState(0); // 0 for NoProject Page 1 for CreateProject Page
  return pageType ? (
    <CreateProjectForm />
  ) : (
    <NoProject setPageType={setPageType} />
  );
}

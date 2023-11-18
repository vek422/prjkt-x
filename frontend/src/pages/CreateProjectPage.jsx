import CreateProjectForm from "../forms/CreateProjectForm";
import { useState } from "react";
import NoProject from "../scene/NoProject";
export default function CreateProjectPage() {
  const [pageType, setPageType] = useState(0); // 0 for NoProject Page 1 for CreateProject Page
  return pageType ? (
    <CreateProjectForm setPageType={setPageType} />
  ) : (
    <NoProject setPageType={setPageType} />
  );
}

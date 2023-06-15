import React, { useEffect, useState } from "react";
import type { ProjectProps } from "../../services/model.types";
import Pagination from "../../components/common/pagination";
import apis from "../../services/apis";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/button";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const ITEMS_PER_PAGE = 6;
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const handleItemOnclick = (id: string) => {
    navigate("/project/" + id);
  };
  const handleUpdataProjectFeature = async (project: ProjectProps) => {
    project.feature = !project.feature;
    if (project.id) {
      await apis.projects.update(project.id, project);
      setRefresh(!refresh);
    } else {
      alert("project id is empty");
    }
  };
  const reportList = projects
    .slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    .map((project, i) => {
      return (
        <tr key={i} className="border-b hover:bg-primary-0">
          <td className="whitespace-nowrap px-6 py-4 font-medium">{i}</td>
          <td
            className="whitespace-nowrap px-6 py-4 cursor-pointer"
            onClick={() => {
              handleItemOnclick(project.id!);
            }}
          >
            <b>{project.name}</b>
          </td>
          <td className="whitespace-nowrap px-6 py-4">
            {
              <Button
                variant="secondary"
                size="small"
                onClick={() => {
                  handleUpdataProjectFeature(project);
                }}
              >
                {project.feature ? "Unfeature" : "Feature"}
              </Button>
            }
          </td>
        </tr>
      );
    });
  const getProjects = async () => {
    const [fetchData, error] = await apis.projects.list();
    if (error) {
      alert(error.message);
    } else {
      setProjects(fetchData);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <div className="page-container bg-primary-10 md:pb-16">
      <div className="responsive-container block pt-16 pb-56 md:pb-64">
        <div className="title-section">
          <h2 className="page-sub-title">Projects</h2>
        </div>
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Projects name
              </th>
              <th scope="col" className="px-6 py-4">
                Feature
              </th>
            </tr>
          </thead>
          <tbody>{reportList}</tbody>
        </table>
        <Pagination
          handleCurrentPage={handleCurrentPage}
          numberOfPages={Math.ceil(projects.length / ITEMS_PER_PAGE)}
        />
      </div>
    </div>
  );
};

export default Projects;

import React, { useEffect, useState } from "react";
import type { ProjectProps } from "../../services/model.types";
import Pagination from "../../components/common/pagination";
import apis from "../../services/apis";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const ITEMS_PER_PAGE = 6;
  const navigate = useNavigate();

  const handleItemOnclick = (id: string) => {
    navigate("/project/" + id);
  };
  const reportList = projects
    .slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    .map((project, i) => {
      return (
        <tr
          key={i}
          className="border-b hover:bg-primary-0"
          onClick={() => {
            handleItemOnclick(project.id!);
          }}
        >
          <td className="whitespace-nowrap px-6 py-4 font-medium">{i}</td>
          <td className="whitespace-nowrap px-6 py-4">{project.name}</td>
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

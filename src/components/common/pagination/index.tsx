import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import clsx from "clsx";
import {
  faAngleRight,
  faAngleLeft,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
interface PagenationProps {
  numberOfPages: number;
  handleCurrentPage: (currentPage: number) => void;
}
const Pagination = (props: PagenationProps) => {
  const array = Array.from(Array(props.numberOfPages).keys());
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0);

  return (
    <div className="font-muli text-[13px] mx-auto w-fit mt-11 md:mt-16">
      <button
        className="pr-3"
        onClick={() => {
          if (currentPage > 0) {
            if (currentPage > 1 && currentPage < props.numberOfPages - 1) {
              setOffSet(offSet - 1);
            }
            setCurrentPage(currentPage - 1);
            props.handleCurrentPage(currentPage - 1);
          }
        }}
      >
        <FontAwesomeIcon size="sm" icon={faAngleLeft} />
      </button>
      {currentPage > 1 && (
        <>
          <button
            className="px-3"
            onClick={() => {
              setOffSet(0);
              setCurrentPage(0);
              props.handleCurrentPage(0);
            }}
          >
            1
          </button>
          <FontAwesomeIcon size="sm" icon={faEllipsis} />
        </>
      )}
      {array.slice(offSet, offSet + 3).map((i) => {
        return (
          <button
            key={i}
            className={clsx("px-3", {
              "text-primary-0 border rounded bg-primary-20 bg-opacity-95":
                i === currentPage,
            })}
            onClick={() => {
              if (i !== currentPage) {
                setCurrentPage(i);
                if (i > 0) {
                  setOffSet(i - 1);
                  if (i === props.numberOfPages - 1) {
                    setOffSet(i - 2);
                  }
                } else {
                  setOffSet(i);
                }
                props.handleCurrentPage(i);
              }
            }}
          >
            {i + 1}
          </button>
        );
      })}
      {currentPage < props.numberOfPages - 2 && (
        <>
          <FontAwesomeIcon size="sm" icon={faEllipsis} />
          <button
            className="px-3"
            onClick={() => {
              setOffSet(props.numberOfPages - 3);
              setCurrentPage(props.numberOfPages - 1);
              props.handleCurrentPage(props.numberOfPages - 1);
            }}
          >
            {props.numberOfPages}
          </button>
        </>
      )}
      <button
        className="pl-3"
        onClick={() => {
          if (currentPage < props.numberOfPages - 1) {
            if (currentPage > 0 && currentPage < props.numberOfPages - 2) {
              setOffSet(offSet + 1);
            }
            setCurrentPage(currentPage + 1);
            props.handleCurrentPage(currentPage + 1);
          }
        }}
      >
        <FontAwesomeIcon size="sm" icon={faAngleRight} />
      </button>
    </div>
  );
};
export default Pagination;

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Pagination from "../../components/common/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faGlobe,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import FileUploadField from "../../components/common/input/file-upload-field";
import Button from "../../components/common/button";
import InputContainer from "../../components/common/input/input-container";
import Input from "../../components/common/input/input-field";
import apis from "../../services/apis";
import type { Artwork } from "../../services/model.types";
const Artworks = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const ITEMS_PER_PAGE = 8;
  const arts = artworks
    .slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    .map((artwork, i) => (
      <div className="p-4" key={i}>
        <ArtworkCard artwork={artwork} />
      </div>
    ));
  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const getArtWorks = async () => {
    const [fetchData, error] = await apis.artworks.list();
    if (error) {
      alert(error.message);
    } else {
      const featureFirst = fetchData.sort(
        (a: Artwork, b: Artwork) => Number(b.feature) - Number(a.feature)
      );
      setArtworks(featureFirst);
    }
  };
  useEffect(() => {
    getArtWorks();
  }, []);
  return (
    <div className="page-container bg-primary-10 md:pb-16">
      <div className="responsive-container block pt-16 pb-56 md:pb-64">
        <div>
          <Button
            data-te-toggle="modal"
            data-te-target="#upload-modal"
            variant="secondary"
          >
            Upload <FontAwesomeIcon className="ml-2" icon={faUpload} />
          </Button>
        </div>
        <div className="grid grid-cols-4 grid-flow-row">{arts}</div>
        <UploadsModal />
        <Pagination
          handleCurrentPage={handleCurrentPage}
          numberOfPages={Math.ceil(artworks.length / ITEMS_PER_PAGE)}
        />
      </div>
    </div>
  );
};

const ArtworkCard = (props: { artwork: Artwork }) => {
  const [edit, setEdit] = useState(false);
  const [artwork, setArtwork] = useState<Artwork>(props.artwork);
  const handleUpdate = async () => {
    const [fetchData, error] = await apis.artworks.update(artwork.id, artwork);
    if (error) {
      alert(error.message);
    } else {
      setArtwork(fetchData);
    }
  };
  const handleDelete = async () => {
    let [fetchData, error] = await apis.artworks.delete(artwork.id);
    if (error) {
      alert(error.message);
    } else {
      [fetchData, error] = await apis.uploads.delete(artwork.publicId);

      if (error) {
        alert(error.message);
      } else {
        alert(fetchData);
      }
    }
  };
  return (
    <div className="bg-neutral-light hover:shadow-xl hover:bg-primary-20 duration-300 h-full relative">
      <IconButton
        className={clsx(
          artwork.feature ? "text-warning-500" : "text-primary-15",
          "absolute m-2"
        )}
        onClick={() => {
          artwork.feature = !artwork.feature;
          handleUpdate();
        }}
      >
        <FontAwesomeIcon icon={faStar} size="lg" />
      </IconButton>
      <IconButton
        className="text-primary-0 m-2 absolute right-0"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </IconButton>
      <div className="mx-auto w-fit mb-20">
        <img className="max-h-[200px] " src={artwork.url} alt="" />
      </div>
      <div className="bottom-0 absolute flex w-full mb-4 text-neutral-dark">
        <button
          onClick={() => {
            artwork.publish = !artwork.publish;
            handleUpdate();
          }}
          className={clsx(
            artwork.publish ? "text-success-500" : "text-primary-15",
            "float-right mx-2"
          )}
        >
          <FontAwesomeIcon icon={faGlobe} size="sm" />
        </button>
        {edit ? (
          <Input
            defaultValue={artwork.name}
            onBlur={(e) => {
              artwork.name = e.target.value;
              handleUpdate();
              setEdit(false);
            }}
          />
        ) : (
          <div
            onClick={() => {
              setEdit(true);
            }}
          >
            {artwork.name}
          </div>
        )}
      </div>
    </div>
  );
};

const IconButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx(
        "border border-primary-0 rounded w-[34px] h-[34px] bg-neutral-light bg-opacity-75",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

const UploadsModal = () => {
  const onFileChoosen = async (files: File[]) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    let [fetchData, error] = await apis.uploads.create(formData);
    if (error) {
      alert(error.message);
    } else {
      [fetchData, error] = await apis.artworks.create(fetchData);
      if (error) {
        alert(error.message);
      } else {
        alert(fetchData);
      }
    }
  };
  return (
    <>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm"
        id="upload-modal"
      >
        <div
          data-te-modal-dialog-ref
          className="translate-y-[-50px] duration-300 h-full flex max-w-fit mx-auto"
        >
          <div className=" my-auto align-middle w-[50vh] h-[25vh] bg-primary-0 rounded p-5">
            <InputContainer lable="Images">
              <FileUploadField
                className="h-[15vh]"
                onFileChosen={onFileChoosen}
                filetypes={["image/jpeg", "image/png"]}
                multiple
              />
            </InputContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artworks;

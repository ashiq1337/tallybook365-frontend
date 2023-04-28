import React, { useEffect, useState } from "react";
import Preview from "../../components/previewAndDownload/Preview";
import { useParams } from "react-router-dom";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";

export default function PreviewPage() {
  const { previewName, previewId, title } = useParams();
  const [response, error, loading, axiosFetch, message] = useAxios();

  const getDetails = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.preview}/${previewName}/${previewId}`,
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {(response?.data) ? (
        <Preview data={response.data} title={title} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

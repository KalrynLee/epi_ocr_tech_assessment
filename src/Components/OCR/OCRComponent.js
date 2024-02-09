import React from "react";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";

const OCRComponent = (props) => {
  const clearImagePaths = () => {
    props.setImagePaths([]);
  };

  const handleChange = (event) => {
    props.setIsLoading((state) => !state);
    let images = [];
    clearImagePaths();
    images = [...event.target.files].map((res) => {
      return URL.createObjectURL(res);
    });

    if (images.length > 0) {
      props.setImagePaths(images);
    }
    props.setIsLoading((state) => !state);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction={"column"}
        className="upload-container"
      >
        <Grid className={"container_header"} item>
          <h3>Invoice OCR Exporter</h3>
        </Grid>
        <Grid className={'container_upload'} item>
          <Stack direction={"row"} spacing={2} sx={{ display: "inline-flex" }}>
            <div>
              <label for="file-upload" className="custom-file-upload">
                Upload Invoices
              </label>
              <input
                id={"file-upload"}
                style={{ display: "none" }}
                type="file"
                accept=".png"
                multiple
                onChange={handleChange}
              />
            </div>
            <div>
              {props.imagePaths.length > 0 && (
                <button
                  type={"button"}
                  className="clear_files"
                  onClick={() => clearImagePaths()}
                >
                  Clear images
                </button>
              )}
            </div>
          </Stack>
        </Grid>
        {props.imagePaths.length > 0 && (
          <Grid item>
            <p>Number of invoices uploaded: {props.imagePaths.length}</p>
          </Grid>
        )}
        <Grid item>{props.children}</Grid>
      </Grid>
    </>
  );
};

export default OCRComponent;

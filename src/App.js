import React,{ useState } from 'react';
import './App.css';
import ExcelExport from './Components/ExcelExport/ExcelExport';
import OCRComponent from './Components/OCR/OCRComponent';
import { HandleORCRead } from './Components/OCR/Functions/HandleOCRRead';
import LoadingSpinner from './Components/LoadingSpinner';
import FormDialog from './Components/FormDialog';
import ProgressBar from './Components/ProgressBar';

//This needs to be simplified, keep it all out and just have app show the things
const App = () => {
  const [imagePaths,setImagePaths] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [openError,setOpenError] = useState(false);
  const [openProgress,setOpenProgress] = useState(false);
  const [errMsg,setErrMsg] = useState("");
  const [progress,setProgress] = useState(0);
 
  const displayError = (message) =>{
    setErrMsg(message);
    setOpenError((state) => !state)
  }

  const handleORCBreakdown = async () => {
      return await HandleORCRead(imagePaths,setProgress)
      .catch((res) => {
        displayError("Failed to recognize text from uploaded invoices")
      });
  }

  return (
    <div className="App">
      <LoadingSpinner open={isLoading}/>
      {/* Dont really know how necessary this really is */}
      <main className="App-main">
        {/* <div className='shaped_bg'> */}
        <OCRComponent setIsLoading={setIsLoading}
         setImagePaths={setImagePaths}
         imagePaths={imagePaths} >
        <ExcelExport setOpenProgress={setOpenProgress}
         displayError={(msg) => displayError(msg)}
         handleData={() => handleORCBreakdown()}
         imagePaths={imagePaths}
         setProgress={setProgress}
         fileName={"Excel Export"} />
        </OCRComponent>
        {/* </div> */}
      </main>
      {openError && (
        <FormDialog
        dialogClassName={'dialog_title_container_error'}
        open={openError}
        title="Oops An Error has occured"
        text={errMsg}
        cancel
        onDialogClose={() => {
          setImagePaths([])
          setOpenError((state) => !state)
        }}
      />
      )}
      {openProgress && (
        <FormDialog
        dialogClassName={'dialog_title_container_success'}
          open={openProgress}
          title="Invoice processing"
          text={'Hold tight whilst we process your documents'}
          content={<ProgressBar progress={progress} />}
          onDialogClose={() => {
            setOpenProgress((state) => !state)
          }}
        />
      )}
    </div>
  );
}

export default App;

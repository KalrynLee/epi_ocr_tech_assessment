import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Tooltip } from '@mui/material';

//Need to figure out how i can go about formatting this
const ExcelExport = ({imagePaths,setOpenProgress,fileName,handleData,displayError,setProgress}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx';

    const exportToExcel = async () =>{
        setOpenProgress((state) => !state);
        const array = await handleData();

        if(array !== undefined && array.length > 0){
        const ws = XLSX.utils.json_to_sheet(array);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type:fileType})
        FileSaver.saveAs(data, fileName + fileExtension);
        setOpenProgress((state) => !state);
        setProgress(0)
    }else{
        setOpenProgress((state) => !state);
        setProgress(0)
        displayError("Failed to generate excel sheet, please try again later")
    }
    }

    return(
        <>
            <Tooltip title="Excel Export">
                <button disabled={!imagePaths.length > 0}
                 className='export_btn'
                 onClick={(e) => exportToExcel(fileName)} color="primary">
                    Excel Export
                </button>
            </Tooltip>
        </>
    )
}

export default ExcelExport;
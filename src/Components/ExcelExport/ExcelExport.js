import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';

//Need to figure out how i can go about formatting this
const ExcelExport = ({imagePaths,setOpenProgress,fileName,handleData,displayError}) => {
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
    }else{
        setOpenProgress((state) => !state);
        displayError("Failed to generate excel sheet, please try again later")
    }
    }

    return(
        <>
            <Tooltip title="Excel Export">
                <Button disabled={!imagePaths.length > 0}
                 variant = "contained"
                 onClick={(e) => exportToExcel(fileName)} color="primary"
                 style={{ cursor: "pointer", fontSize: 14}}>
                    Excel Export
                </Button>
            </Tooltip>
        </>
    )
}

export default ExcelExport;
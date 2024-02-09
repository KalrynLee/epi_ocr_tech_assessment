import Tesseract from 'tesseract.js';
import { ProcessTextResult } from './ProcessTextResult';
import { ProgressCalculation } from './ProgressCalculation';

//TODO documentation
export const HandleORCRead = async (imagePaths,setProgress) =>{
    if(!imagePaths.length > 0){
        //We can put this on a snack bar feedback for error handling
        console.log('Hey this is an error, no files selected')
        return //Early return if faulty
      }
      let promises = [];
      let result = [];
      let index = 0;
      //Here is the loop that i needed to see
      for (const element of imagePaths){
        index = ++index
        let promise = undefined;
  
        promise = Tesseract.recognize(element,'eng');
  
        if(promise){
          promises.push(promise)
        }
  
        //Process max 10 concurrently, this will prevent memory crashes from occuring and will allow us to apply the OCR
        if(promises.length === 10 || index === imagePaths.length){
          const processedResult = await Promise.all(promises);
  
          //After promise(s) is done call processing method to handle data format to be consumed in excel
          const processedText = await ProcessTextResult(processedResult);
          if(processedText.length > 0){
            //Spread operartor
            const combinded = [...result,...processedText]
            result = [...combinded]
            //HandleProgress calculation
            setProgress(ProgressCalculation(imagePaths,result))
          }
          promises = [];
        }
      }
      if(result.length > 0){
        //Reset the progress for next batch, statement
        return result
      }
}
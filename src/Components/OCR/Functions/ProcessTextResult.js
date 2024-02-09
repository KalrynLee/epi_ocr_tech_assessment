
//I am going to see how these fit in and all
export const ProcessTextResult = async (processedResult) =>{
    return processedResult.map((res) =>{
        let processedObject = {}
        let totals = [];
        //Lets get a source of truth, and have it as reference point
        const resContent = res.data.text;
        
        //This should give us the individual section in which i am grabbing the items/totals, this might be a better approach to that of the totals
        let itemSections = resContent.split("TOTAL")[1]
        itemSections = itemSections.split("Remarks")[0]
        const entries = itemSections.split(/[0-9]+[\r\n]/i);
  
        let concatenatedString = '';
        entries.forEach((res,index) =>{
          if(res !== '' && res !== " "){
          concatenatedString = concatenatedString + `{${index + 1}} ` + res.replace("\n"," ").trim() + "\n";
          processedObject['Items Summary'] = concatenatedString;
        }
        })
  
        const splitTextViaSpace = resContent.split(" ");
  
        splitTextViaSpace.forEach((res) =>{
        const resSplit = res.split("\n");
              
        if(resSplit.length > 1){
          const total = Number(resSplit[0]);
  
          if(!isNaN(total) && total > 0){
              totals.push(total);
            }
          }
        })
        let entryGrandTotal = 0;
          totals.forEach((res,index) =>{
            if(index === 0){
              processedObject['Invoice Number'] = res; 
            }else{
              entryGrandTotal = entryGrandTotal + res;
              processedObject[`total{${index}}`] = res;
            }
          })
          processedObject['Grand Total'] = entryGrandTotal;

          //Return in structured format, short cut
          return {
            "Invoice Number": processedObject['Invoice Number'],
            "Grand Total": processedObject['Grand Total'],
            "Items Summary": processedObject['Items Summary'],
            ...processedObject
          }
      })
}
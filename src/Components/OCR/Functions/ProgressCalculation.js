export const ProgressCalculation = (totalImages,processedImages) =>{
const percentPerImage = 100/totalImages.length;
const percentageProcessed = percentPerImage * processedImages.length;
return percentageProcessed;
} 
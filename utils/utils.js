const path=require('path')
const fs=require('fs');

exports.staticFilePath=path.join(__dirname,'..','images');

exports.clearImage=(filePath)=>{
    fs.unlink(filePath,err=>{
    })

}

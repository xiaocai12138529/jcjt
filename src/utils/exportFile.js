import { saveAs } from 'file-saver';
export function exportFile(url) {
    let name = url.substring(url.lastIndexOf("/")+1, url.length);
    saveAs(url,name)
}
export function downloadFn(data,name) {
    const link=document.createElement("a");
    let blob=new Blob([data],{type:'application/vnd.ms-excel;charset=utf-8'});
    link.style.display="none"
    link.download=name
    link.href=window.URL.createObjectURL(blob)
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blob);
}
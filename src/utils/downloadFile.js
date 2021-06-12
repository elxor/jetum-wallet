export const downloadFile = (name, content) => {
    const filename = name;
    const element = document.createElement('a');

    element.setAttribute('download', filename);
    const blob = new Blob([content], {type: 'application/json;charset=utf-8'});
    element.setAttribute('href', URL.createObjectURL(blob));

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(blob);
}
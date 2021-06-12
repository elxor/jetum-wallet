export const readFile = async (file) => {

    const content = await new Promise(resolve => {

        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
    });

    return content;
}
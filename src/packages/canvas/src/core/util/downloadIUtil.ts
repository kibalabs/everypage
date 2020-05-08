
export const downloadFile = async (filename: string, content: string): Promise<void> => {
  const blob = new Blob([content]);
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

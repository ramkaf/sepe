import { promises as fs } from 'fs';

export const readFileContents = async (filePath: string): Promise<string> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log('File contents:', data);
    return data;
  } catch (error) {
    const e = error as Error;
    console.error('Error reading file:', error);
    throw error;
  }
};

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === 'string') {
    return err;
  }
  return JSON.stringify(err);
}

export function toTitleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
export function getIndexByPlantTag(tag: string) {
  return `${tag}-*`;
}

export function getlastPlantIndex(plantTag: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');

  return `${plantTag}-${year}.${month}.${day}`;
}

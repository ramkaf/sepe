import { promises as fs } from 'fs';

export const readFileContents = async (filePath: string): Promise<string> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log('File contents:', data);
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

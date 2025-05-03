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

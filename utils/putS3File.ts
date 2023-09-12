import { Storage } from 'aws-amplify';

export const putS3File = async (filename: string, file: File, level?: any) => {
  const s3filename = `${Math.floor(Math.random() * (999 - 100 + 1) + 100)}-${filename}`;

  return await Storage.put(s3filename, file, {
    level: level || 'public'
  });
};

import { Storage } from 'aws-amplify';

export const getS3File = async (filename: string, level?: any) => {
  if (!filename) return '';

  return await Storage.get(filename, {
    level: level || 'public',
    expires: 7 * 24 * 60 * 60 // 7 days which is max
  });
};

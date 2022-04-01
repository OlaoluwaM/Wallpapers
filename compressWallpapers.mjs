#!/usr/bin/env node
import { exec } from 'child_process';
import { homedir } from 'os';
import { promisify } from 'util';
import { unlink, stat } from 'fs/promises';

const ROOT_DIR = `${homedir()}/Pictures/Wallpapers`;
const COMPRESSED_FILE_NAME = 'wallpapers.tar.gz';

await compressWallpapers();

async function compressWallpapers() {
  switchToDesiredWorkingDir();
  await deletePreviousCompressedFile();
  await createWallpaperTarball();
}

function switchToDesiredWorkingDir() {
  process.chdir(ROOT_DIR);
}

async function deletePreviousCompressedFile(filepath = COMPRESSED_FILE_NAME) {
  const pathToFile = `./tarball/${filepath}`;

  try {
    await stat(pathToFile);
    console.log('Found an old compressed file. Removing...');
    await unlink(pathToFile);
    console.log('Done!');
  } catch (error) {
    console.log('No stale compressed file found. Moving on...');
  }
}

async function createWallpaperTarball(filename = COMPRESSED_FILE_NAME) {
  const promisifiedExec = promisify(exec);

  try {
    console.log('Creating wallpaper tarball...');
    await promisifiedExec(`tar -czf tarball/${filename} ./images`);
    console.log(`Compression Successful at tarball/${COMPRESSED_FILE_NAME}`);
  } catch (error) {
    console.error('An error occurred while creating wallpaper tarball');
    console.error(error);
    process.exit(1);
  }
}

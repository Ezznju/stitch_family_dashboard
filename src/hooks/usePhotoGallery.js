import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const PROFILE_PHOTO_STORAGE = 'profile_photo';

export function usePhotoGallery() {
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Preferences.get({ key: PROFILE_PHOTO_STORAGE });
            if (value) {
                const savedPhoto = JSON.parse(value);

                if (!Capacitor.isNativePlatform()) {
                    // Web Platform: Load the photo as base64
                    // simplified for web dev: we assume we just stored base64 or a blob url in web view
                    setPhoto(savedPhoto);
                } else {
                    // Native Platform: Read from filesystem
                    const file = await Filesystem.readFile({
                        path: savedPhoto.filepath,
                        directory: Directory.Data,
                    });
                    setPhoto({
                        ...savedPhoto,
                        webviewPath: `data:image/jpeg;base64,${file.data}`, // WebviewPath for immediate display
                    });
                }
            }
        };
        loadSaved();
    }, []);

    const takePhoto = async () => {
        try {
            const cameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 90,
            });

            const fileName = new Date().getTime() + '.jpeg';
            const savedFileImage = await savePicture(cameraPhoto, fileName);

            setPhoto(savedFileImage);

            // Persist the metadata
            Preferences.set({
                key: PROFILE_PHOTO_STORAGE,
                value: JSON.stringify(savedFileImage),
            });

        } catch (e) {
            console.warn("User cancelled or error taking photo", e);
        }
    };

    const savePicture = async (photo, fileName) => {
        let base64Data;

        // "Hybrid" implementation: works on Web and Native
        if (Capacitor.isNativePlatform()) {
            const file = await Filesystem.readFile({
                path: photo.path,
            });
            base64Data = file.data;
        } else {
            // Web: fetch the blob and convert to base64
            base64Data = await base64FromPath(photo.webPath);
        }

        // Write the file to the data directory
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        if (Capacitor.isNativePlatform()) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
                filepath: fileName,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            // Use webPath to display the new image instead of base64 since it's already loaded in memory
            return {
                filepath: fileName,
                webviewPath: photo.webPath,
            };
        }
    };

    return {
        photo,
        takePhoto,
    };
}

export async function base64FromPath(path) {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    });
}

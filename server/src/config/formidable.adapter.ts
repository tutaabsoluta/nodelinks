import { Request } from "express";
import { formidable } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { UuidAdapter } from "./uuid.adapter";

export class FormidableAdapter {

    static async parseForm(req: Request): Promise<string> {
        
        const form = formidable({ multiples: false });

        return await new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) return reject(error);

                const file = Array.isArray(files.image) ? files.image[0] : files.image;
                if (!file) return reject(new Error('No image provided'));

                try {
                    const result = await cloudinary.uploader.upload(file.filepath, {
                        public_id: UuidAdapter.generate(),
                    });

                    resolve(result.secure_url);
                } catch (uploadError) {
                    reject(uploadError);
                }
            });
        });
    }

}

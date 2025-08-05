import { Slugify } from "../../../config";
import { UserModel } from "../../../data";
import { CustomError, UserEntity } from "../../../domain";
import { UpdateUserDto } from "../../dtos/user/update-user.dto";



export class UserService {


    async updateUser(user: UserEntity, updateUserDto: UpdateUserDto) {
        
        const handle = Slugify.create(updateUserDto.handle);

        const handleExists = await UserModel.findOne({ handle });
        if (handleExists) {
            throw CustomError.conflict('The handle already exists');
        }

        await UserModel.updateOne(
            { _id: user.id },
            { handle: updateUserDto.handle, description: updateUserDto.description }
        );

        const updatedUserDoc = await UserModel.findById(user.id);
        if (!updatedUserDoc) throw CustomError.notFound('User not found');

        return updatedUserDoc;
    }
}
import { Slugify } from "../../../config";
import { UserModel } from "../../../data";
import { CustomError, UserEntity } from "../../../domain";
import { UpdateUserDto } from "../../dtos/user/update-user.dto";



export class UserService {


    async updateUser(user: UserEntity, updateUserDto: UpdateUserDto) {

        
        try {

            const handle = Slugify.create( updateUserDto.handle );
    
            const handleExists = await UserModel.findOne({handle});
    
            if ( handleExists ) {
                throw CustomError.conflict('The handle already exist')
            }
    
            user.handle = updateUserDto.handle;
            user.description = updateUserDto.description;
            
        } catch (error) {
            console.log({error})
        }
    } 
}
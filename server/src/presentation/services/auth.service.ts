import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exist');

        try {

            // create document
            const user = new UserModel(registerUserDto);

            // hash the password
            user.password = BcryptAdapter.hashPassword(registerUserDto.password);

            // save the document
            await user.save();

            // create the entity
            const { password, ...userEntity } = UserEntity.fromObject(user);

            // return the user entity and token
            return {
                user: userEntity,
                token: 'ABC',
            };

        } catch (error) {

            throw CustomError.internalServer(`${error}`);

        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.badRequest('User not found');

        try {
            const isMatch = BcryptAdapter.compareHash( loginUserDto.password, user.password )

            if (!isMatch) throw CustomError.badRequest('Invalid password');

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generetaToken({ id: user.id });

            if ( !token ) throw CustomError.internalServer('Error while creating jwt');

            return {
                user: userEntity,
                token: token,
            }

        } catch (error) {

            throw CustomError.internalServer(`${error}`);
            
        }
    }
}

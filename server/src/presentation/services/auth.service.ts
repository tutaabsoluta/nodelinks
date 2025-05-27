import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exist');

        try {

            // create document
            const user = new UserModel(registerUserDto);

            // hash the password
            user.password =  BcryptAdapter.hashPassword( registerUserDto.password );

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

    public async loginUser() {

    }

}

/**
Servicio para registro:
- Recibe los datos desde el controller
- Hacer verificaciones:
    - revisar si existe el email en la BD
- Instanciar el Model
- Guardar el usuario
- Elimnar el password del objeto
- DEVOLVER EL USUARIO Y EL TOKEN

 */
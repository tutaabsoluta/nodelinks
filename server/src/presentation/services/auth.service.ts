import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";



export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) { }

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

            // confirmation mail
            await this.sendEmailValidationLink(user.email);

            // create the entity
            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generetaToken({ id: user.id });

            if (!token) throw CustomError.internalServer('Error while creating jwt');

            // return the user entity and token
            return {
                user: userEntity,
                token: token,
            };

        } catch (error) {

            throw CustomError.internalServer(`${error}`);

        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.badRequest('User not found');

        try {
            const isMatch = BcryptAdapter.compareHash(loginUserDto.password, user.password)

            if (!isMatch) throw CustomError.badRequest('Invalid password');

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generetaToken({ id: user.id });

            if (!token) throw CustomError.internalServer('Error while creating jwt');

            return {
                user: userEntity,
                token: token,
            }

        } catch (error) {

            throw CustomError.internalServer(`${error}`);

        };

    }

    public validateEmail() {

    }

    private sendEmailValidationLink = async (email: string) => {

        // generar token
        const token = await JwtAdapter.generetaToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEB_SERVICE_URL}auth/validate-email/${token}`;

        const htmlBody = `
        <h1>Validate your account</h1>
        <p>Click the following link to validate your accoung</p>
        <a href="${link}">Validate account: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate yor account',
            htmlBody: htmlBody,
        }

        const isSent = await this.emailService.sendEmail(options);

        if (!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }
}

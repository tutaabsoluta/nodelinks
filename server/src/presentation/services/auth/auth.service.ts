import { BcryptAdapter, envs, JwtAdapter, Slugify, } from "../../../config";
import { UserModel } from "../../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";
import { EmailService } from "./email.service";



export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const slugifiedHandle = Slugify.create(registerUserDto.handle);

        const [existUser, existHandle] = await Promise.all([
            UserModel.findOne({ email: registerUserDto.email }),
            UserModel.findOne({ handle: slugifiedHandle })
        ]);

        if (existUser) throw CustomError.conflict('The user already exist');
        if (existHandle) throw CustomError.conflict('The handle already exist');

        try {

            // create document
            const user = new UserModel({
                ...registerUserDto,
                password: BcryptAdapter.hashPassword(registerUserDto.password),
                handle: slugifiedHandle 
            });

            // save the document
            await user.save();

            // confirmation mail
            await this.sendEmailValidationLink(user.email);

            // create the entity
            const { password, ...userEntity } = UserEntity.fromObject(user);

            // create the token
            const token = await JwtAdapter.generetaToken({ id: user.id });

            if (!token) throw CustomError.internalServer('Error while creating jwt');

            // return the user entity and token
            return {
                user: userEntity,
                token: token,
                message: 'User created successfully',
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.notFound('User not found');

        try {
            const isMatch = BcryptAdapter.compareHash(loginUserDto.password, user.password)

            if (!isMatch ) throw CustomError.badRequest('Invalid password');

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generetaToken({ id: user.id });

            if (!token) throw CustomError.internalServer('Error while creating jwt');

            return {
                user: userEntity,
                token: token,
                message: 'Login successfull',
            }

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`);

        };

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

    public validateEmail = async (token: string) => {

        const payload = await JwtAdapter.validateJwt(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email doesnt exist in the token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email doesnt exist');

        user.emailValidated = true;

        await user.save();

        return true;
    }
}

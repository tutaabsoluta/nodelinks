import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ui";
import type { FormEventHandler } from "react";
import type { ProfileForm } from "../../types";

type ProfileFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};



export const ProfileInfoForm = ({ onSubmit }: ProfileFormProps) => {

    const { register, formState: { errors } } = useFormContext<ProfileForm>();

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={onSubmit}
        >
            <legend className="text-2xl text-slate-800 text-center">Edit Information</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Handle or username"
                    {...register('handle', {
                        required: ' The handle is mandatory'
                    })}
                />

                {errors.handle && <ErrorMessage message={`${errors.handle.message}`} />}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Your description"
                    {...register('description', {
                        required: ' The description is mandatory',
                        max: {
                            value: 100,
                            message: 'Max 100 characters',
                        }
                    })}
                />
                {errors.description && <ErrorMessage message={`${errors.description.message}`} />}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Image:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={() => { }}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Save Changes'
            />
        </form>
    )
}

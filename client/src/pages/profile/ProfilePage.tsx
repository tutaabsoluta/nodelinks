import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateUser } from "../../api";
import { ProfileInfoForm } from "../../components";
import type { ProfileForm, User } from "../../types";

export const ProfilePage = () => {

    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<User>(['user'])!;

    const methods = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description,
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            toast.error(error.message, {
                style: {
                    backgroundColor: '#db4b4b',
                    fontSize: '16px',
                    color: 'white'
                }
            })
        },
        onSuccess: (data) => {
            toast.success(data?.message, {
                style: {
                    backgroundColor: '#72ed97',
                    fontSize: '16px',
                    color: 'black'
                }
            })
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleUserProfileForm = (formData: ProfileForm) => {
        console.log(formData)
        updateProfileMutation.mutate(formData)
    }


    return (
        <FormProvider { ...methods }>
            <ProfileInfoForm onSubmit={methods.handleSubmit(handleUserProfileForm)}/>
        </FormProvider>
    )
}
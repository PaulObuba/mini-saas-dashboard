"use client";

import useAuth from "@/app/hooks/use-auth";
import { User } from "@/app/types/user";
import { Button } from "@/components/ui/Button";
import { DateInput } from "@/components/ui/DateInput";
import DropdownInput from "@/components/ui/DropdownInput";
import CustomDialog, { DialogFooter } from "@/components/ui/modals/Dialog";
import PhoneInput from "@/components/ui/PhoneInput";
import TextInput from "@/components/ui/TextInput";
import { USER_KEY } from "@/lib/auth";
import { countryData, genderOptions, normalizePhone } from "@/lib/constant";
import { validatePhoneNumberWithYup } from "@/lib/validate-phone-number-with-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const UpdateProfileModal = ({
  details,
  setShowUpdateProfileModal,
  showUpdateProfileModal,
}: {
  details: User;
  showUpdateProfileModal: boolean;
  setShowUpdateProfileModal: (val: boolean) => void;
}) => {
  const { setAuthUser } = useAuth();

  const {
    control,
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: details?.first_name || "",
      lastName: details?.last_name || "",
      dateOfBirth: details?.dateOfBirth || "",
      gender: details?.gender || "",
      country: details?.country || "",
      state: details?.state || "",
      email: details?.email || "",
      phoneNumber: normalizePhone(details?.phone) || "",
      address: details?.address || "",
    },
  });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const storedData = localStorage.getItem(USER_KEY);
    const authData = storedData ? JSON.parse(storedData) : null;

    if (!authData) return;

    const updatedUser = {
      ...authData.user,
      name: `${data.firstName} ${data.lastName}`,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      gender: data.gender,
      country: data.country,
      state: data.state,
      address: data.address,
      phone: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      title: authData.user.title,
      country_code: authData.user.country_code,
      profilePicture: authData.user.profilePicture,
    };

    const newAuthData = {
      ...authData,
      user: updatedUser,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(newAuthData));

    setAuthUser(newAuthData);
    setShowUpdateProfileModal(false);
  };

  return (
    <CustomDialog
      title="Update Profile"
      description="Update your personal details below"
      openModal={showUpdateProfileModal}
      onClose={() => setShowUpdateProfileModal(false)}
      className="w-full max-w-2xl"
    >
      <div className="grid md:grid-cols-2 gap-5 pb-5">
        <TextInput
          label="First Name"
          placeholder="Enter first name"
          {...register("firstName")}
          error={errors.firstName?.message}
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Enter last name"
          {...register("lastName")}
          error={errors.lastName?.message}
          required
        />

        <TextInput
          label="Email Address"
          placeholder="Enter email"
          {...register("email")}
          error={errors.email?.message}
          required
        />

        <PhoneInput
          label="Phone Number"
          control={control}
          name="phoneNumber"
          error={errors.phoneNumber?.message}
          required
        />

        <DateInput
          required
          label="Date of Birth"
          placeholder="Select date of birth"
          defaultValue={
            details?.dateOfBirth
              ? new Date(details?.dateOfBirth).toISOString()
              : undefined
          }
          {...register("dateOfBirth", {
            onChange: (e) => setValue("dateOfBirth", e.target.value),
          })}
          onValueChange={(value) => {
            setValue("dateOfBirth", value);
            clearErrors("dateOfBirth");
          }}
          error={errors.dateOfBirth?.message}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <DropdownInput
              label="Gender"
              placeholder="Select gender"
              options={genderOptions}
              value={field.value}
              error={errors.gender?.message}
              required
              onValueChange={(val) => field.onChange(val)}
            />
          )}
        />

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <DropdownInput
              label="Country"
              placeholder="Select country"
              options={
                countryData?.map((country) => ({
                  label: country.name,
                  value: country.name,
                })) || []
              }
              error={errors.country?.message}
              value={field.value}
              required
              onValueChange={(val) => field.onChange(val)}
            />
          )}
        />

        <TextInput
          label="State"
          placeholder="Enter state"
          {...register("state")}
          error={errors.state?.message}
          required
        />

        <div className="md:col-span-2">
          <TextInput
            label="Home Address"
            placeholder="Enter home address"
            {...register("address")}
            error={errors.address?.message}
            required
          />
        </div>
      </div>

      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setShowUpdateProfileModal(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button className="text-white w-full" onClick={handleSubmit(onSubmit)}>
          Update Profile
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default UpdateProfileModal;

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: validatePhoneNumberWithYup({ required: true }).required(
    "Phone number is required"
  ),
  address: yup.string().required("Home address is required"),
});

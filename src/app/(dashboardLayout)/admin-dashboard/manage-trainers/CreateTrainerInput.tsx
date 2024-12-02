import { useSignUpMutation } from "@/redux/features/Auth/authApi";
import { useCreateTrainerMutation } from "@/redux/features/Trainer/trainerApi";
import React from "react";
import { toast } from "sonner";

const CreateTrainerInput = ({ onClose }: any) => {
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [createTrainer] = useCreateTrainerMutation();

  const handleTrainer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const trainerData = {
      name: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      specialization: form.specialization.value,
    };
    console.log(trainerData);
    const { name, email, password,  specialization } = trainerData; // Destructure trainerData
    try {
      const register = await signUp({ name, email, role:"Trainer", password }).unwrap();
    //   console.log(register, "register done");
      const user = register.data._id
    //   console.log(user, 'uuuuu');
      const trainer = await createTrainer({user, specialization}).unwrap();
    //   console.log(trainer, 'trainer done');
      toast.success(trainer.message, {
        duration: 4000,
        style: { color: "green" },
      });
      onClose()
    } catch (err: any) {
      console.log({ err });
      toast.error(`Error: ${err.data.message || "Sign-up failed"}`, {
        duration: 4000,
        style: { color: "red" },
      });
    }
  };
  return (
    <div className="backdrop-blur-md w-full max-w-md lg:max-w-lg xl:max-w-xl p-6 md:p-8 lg:p-10 rounded border border-gray-500/30 shadow-lg mx-auto bg-gray-800">
      <form onSubmit={handleTrainer} className="space-y-6">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white text-sm md:text-base">
              Full Name
            </span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your Full Name"
            className="input-field"
            required
          />
        </div>
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white text-sm md:text-base">
              Email
            </span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input-field"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white text-sm md:text-base">
              Specialization
            </span>
          </label>
          <input
            type="text"
            name="specialization"
            placeholder="Specialization .."
            className="input-field"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white text-sm md:text-base">
              Password
            </span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input-field"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6 ">
          <button
            type="submit"
            className="w-full btn bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white text-lg font-semibold"
          >
            Created
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrainerInput;

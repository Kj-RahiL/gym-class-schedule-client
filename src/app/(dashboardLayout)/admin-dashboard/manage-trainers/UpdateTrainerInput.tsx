import React from "react";
import { useUpdateTrainerMutation } from "@/redux/features/Trainer/trainerApi";
import { toast } from "sonner";

const UpdateTrainerInput = ({ trainer, onClose }: any) => {
  const [updateTrainer] = useUpdateTrainerMutation();

  const handleTrainerUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const updatedData = {
      name: form.fullName.value,
      email: form.email.value,
      specialization: form.specialization.value,
    };

    try {
      const res = await updateTrainer({
        id: trainer._id,
        updatedData,
      }).unwrap();
      console.log(res)
      toast.success(res.message || "Trainer updated successfully!", {
        duration: 4000,
      });
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update trainer", {
        duration: 4000,
      });
    }
  };

  return (
    <div className="backdrop-blur-md w-full max-w-md lg:max-w-lg xl:max-w-xl p-6 md:p-8 lg:p-10 rounded border border-gray-500/30 shadow-lg mx-auto bg-gray-800">
      <form onSubmit={handleTrainerUpdate} className="space-y-6 ">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            defaultValue={trainer.user?.name || ""}
            className="input-field"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            name="email"
            defaultValue={trainer.user?.email || ""}
            className="input-field"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Specialization</span>
          </label>
          <input
            type="text"
            name="specialization"
            defaultValue={trainer.specialization || ""}
            className="input-field"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn w-full bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTrainerInput;

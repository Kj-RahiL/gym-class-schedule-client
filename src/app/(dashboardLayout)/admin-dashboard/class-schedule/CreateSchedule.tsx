import React, { useState } from "react";
import { toast } from "sonner";
import { Button, Input, Select, SelectItem } from "@nextui-org/react"; // Assuming you're using NextUI
import { useGetAllTrainerQuery } from "@/redux/features/Trainer/trainerApi";
import { useCreateScheduleMutation } from "@/redux/features/Schedule/scheduleApi";


const CreateSchedule = ({  onclose}: any) => {
    const {data} = useGetAllTrainerQuery(' ')
    const [createSchedule]= useCreateScheduleMutation()
    // console.log(data?.data)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const scheduleInfo = {
      trainer: form.trainer.value,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
    };
    console.log(scheduleInfo)

    try {
      const response = await createSchedule(scheduleInfo).unwrap();
    //   console.log(response)
      toast.success(response.message || "Schedule created successfully!");
      form.reset()
      onclose()
    } catch (error: any) {
      toast.error(`Error: ${error?.data?.message || "Failed to create schedule"}`);
    }
  };

  return (
    <div className="p-4 rounded shadow bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="trainer" className="block text-sm text-gray-400">
            Select Trainer
          </label>
          <Select
            name="trainer"
            required
            placeholder="Choose a trainer"
          >
            {data?.data?.map((trainer: any) => (
              <SelectItem key={trainer._id} value={trainer._id}>
                {trainer.user.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm text-gray-400">
            Date
          </label>
          <Input
            type="date"
            name="date"
            required
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm text-gray-400">
            Start Time
          </label>
          <Input
            type="time"
            name="startTime"
            required
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm text-gray-400">
            End Time
          </label>
          <Input
            type="time"
            name="endTime"
            required
            className="input-field"
          />
        </div>

        <Button type="submit"   className="w-full btn bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white text-lg font-semibold">
          Create Schedule
        </Button>
      </form>
    </div>
  );
};

export default CreateSchedule;

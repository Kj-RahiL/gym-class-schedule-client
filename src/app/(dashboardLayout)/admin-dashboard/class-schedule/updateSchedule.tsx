import React, { useState } from "react";
import { toast } from "sonner";
import { Button, Input, Select, SelectItem } from "@nextui-org/react"; // Assuming you're using NextUI
import { useGetAllTrainerQuery } from "@/redux/features/Trainer/trainerApi";
import {
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
} from "@/redux/features/Schedule/scheduleApi";

const UpdateSchedule = ({ schedule, onClose }: any) => {
  const { data } = useGetAllTrainerQuery(" ");
  const [updateSchedule] = useUpdateScheduleMutation();

  // State to manage selected trainer
  const [selectedTrainer, setSelectedTrainer] = useState(
    schedule?.trainer?._id || ""
  );

//   console.log(schedule, "schedule");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const scheduleInfo = {
      trainer: selectedTrainer,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
    };
    console.log(scheduleInfo);

    try {
      const response = await updateSchedule( {id: schedule._id, scheduleInfo}).unwrap();
      console.log(response)
      toast.success(response.message || "Schedule Updated successfully!");
      onClose()
    } catch (error: any) {
        console.log(error)
      toast.error(`Error: ${error?.data?.message || "Failed to Updated schedule"}`);
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
            value={selectedTrainer} // Bind state to the value
            onChange={(e) => {
              const selectedValue = e.target.value || e;
              setSelectedTrainer(selectedValue);
            }} // Update state on change
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
            defaultValue={schedule?.date?.split("T")[0] || ""}
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
            defaultValue={schedule?.startTime || ""}
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
            defaultValue={schedule?.endTime || ""}
          />
        </div>

        <Button
          type="submit"
          className="w-full btn bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white text-lg font-semibold"
        >
          Update Schedule
        </Button>
      </form>
    </div>
  );
};

export default UpdateSchedule;

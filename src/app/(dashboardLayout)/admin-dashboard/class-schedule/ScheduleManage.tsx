/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useGetAllTrainerQuery,
} from "@/redux/features/Trainer/trainerApi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import { toast } from "sonner";
import CustomModal from "../../components/modal/CustomModal";

import { useState } from "react";
import CreateSchedule from "./CreateSchedule";
import { useDeleteScheduleMutation, useGetAllScheduleQuery } from "@/redux/features/Schedule/scheduleApi";
import UpdateSchedule from "./updateSchedule";

const ScheduleManage = () => {
  const createDisclosure = useDisclosure();
  const updateDisclosure = useDisclosure();
  const { data, isLoading, error } = useGetAllTrainerQuery("");
  const { data:scheduleData, } = useGetAllScheduleQuery("");
  // console.log(scheduleData, 'sssssss')

  const [deleteSchedule] = useDeleteScheduleMutation();
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null); ; 


  // Handle user deletion
  const handleDelete = async (id: string) => {
    console.log(id, "hit delete");
    try {
      const res = await deleteSchedule({ id }).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success(res.message || "User deleted successfully!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Failed to delete user: ${error?.message}`);
    }
  };

  // Handle update
  const handleUpdate = (schedule: any) => {
    setSelectedSchedule(schedule); // Set the selected trainer data
    updateDisclosure.onOpen(); // Open the modal
  };

  if (isLoading) return <div>Loading</div>;
  if (error) return <p>Error fetching users</p>;

  return (
    <div>
      <Button
        onClick={createDisclosure.onOpen}
        className=" w-full bg-primary-100 dark:bg-gradient-to-tr from-neutral-900 via-gray-800 to-blue-600 dark:text-white text-xl  font-medium my-4"
      >
        {" "}
        Create Schedule{" "}
      </Button>
      <Table aria-label="User Management Table">
        <TableHeader>
          <TableColumn>Trainer</TableColumn>
          <TableColumn>SPECIALIZATION</TableColumn>
          <TableColumn>Date&Time</TableColumn>
          <TableColumn>Capacity</TableColumn>
          <TableColumn>BookCount</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {scheduleData?.data?.map((schedule: any) => (
            <TableRow key={schedule._id}>
              <TableCell>
                <h2>{schedule?.trainer?.user?.name}</h2>
                <p className="text-gray-300 text-xs">{schedule?.trainer?.user?.email}</p>
              </TableCell>
              <TableCell>{schedule.trainer?.specialization}</TableCell>
              <TableCell>
              <h2>{schedule.date.slice(0, 10)}</h2>
              <p className="text-gray-300 text-xs">{schedule.startTime} - {schedule.endTime}</p>
              </TableCell>
              <TableCell>{schedule.maxCapacity}</TableCell>
              <TableCell>{schedule.bookCount}</TableCell>
              <TableCell>
                <Button
                  color="warning"
                  onClick={() => handleUpdate(schedule)}
                  className="mr-2 bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white"
                >
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(schedule._id)}
                  className="bg-gradient-to-tr from-neutral-900  to-pink-600"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* delete */}
      <CustomModal
        size="xl"
        scrollBehavior="outside"
        isOpen={createDisclosure.isOpen}
        onOpenChange={createDisclosure.onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Create Schedule
        </ModalHeader>
        <CreateSchedule
          onClose={createDisclosure.onClose}
        />
      </CustomModal>

      {/* update */}
      <CustomModal
        size="xl"
        scrollBehavior="outside"
        isOpen={updateDisclosure.isOpen}
        onOpenChange={updateDisclosure.onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Update Trainer
        </ModalHeader>
        {selectedSchedule && (
          <UpdateSchedule
            schedule={selectedSchedule} 
            onClose={updateDisclosure.onClose} 
          />
        )}
        
      </CustomModal>
    </div>
  );
};

export default ScheduleManage;

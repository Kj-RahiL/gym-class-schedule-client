/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteTrainerMutation,
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
import CreateTrainerInput from "./CreateTrainerInput";
import { useState } from "react";
import UpdateTrainerInput from "./UpdateTrainerInput";

const ManageTrainer = () => {
  const createDisclosure = useDisclosure();
  const updateDisclosure = useDisclosure();
  const { data, isLoading, error } = useGetAllTrainerQuery("");
  const [deleteTrainer] = useDeleteTrainerMutation();
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null); ; 


  // Handle user deletion
  const handleDelete = async (id: string) => {
    console.log(id, "hit delete");
    try {
      const res = await deleteTrainer({ id }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message || "User deleted successfully!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Failed to delete user: ${error?.message}`);
    }
  };

  // Handle update
  const handleUpdate = (trainer: any) => {
    setSelectedTrainer(trainer); // Set the selected trainer data
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
        Create Trainer{" "}
      </Button>
      <Table aria-label="User Management Table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>SPECIALIZATION</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.map((trainer: any) => (
            <TableRow key={trainer._id}>
              <TableCell>{trainer.user?.name}</TableCell>
              <TableCell>{trainer.user?.email}</TableCell>
              <TableCell>{trainer.user?.role}</TableCell>
              <TableCell>{trainer.specialization}</TableCell>
              <TableCell>
                <Button
                  color="warning"
                  onClick={() => handleUpdate(trainer)}
                  className="mr-2 bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white"
                >
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(trainer._id)}
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
          Create Trainer
        </ModalHeader>
        <CreateTrainerInput
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
        {selectedTrainer && (
          <UpdateTrainerInput
            trainer={selectedTrainer} 
            onClose={updateDisclosure.onClose} 
          />
        )}
        
      </CustomModal>
    </div>
  );
};

export default ManageTrainer;

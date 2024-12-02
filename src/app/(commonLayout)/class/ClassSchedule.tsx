/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllScheduleQuery } from "@/redux/features/Schedule/scheduleApi";
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

const ClassSchedule = () => {
  const { data: scheduleData, isLoading } = useGetAllScheduleQuery("");
  // console.log(scheduleData, 'sssssss')

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <Table aria-label="User Management Table">
        <TableHeader>
          <TableColumn>Time SLot</TableColumn>
          <TableColumn>Trainer</TableColumn>
          <TableColumn>Specialization</TableColumn>
          <TableColumn>Class Capacity</TableColumn>
          <TableColumn>Book Count</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {scheduleData?.data?.map((schedule: any) => (
            <TableRow key={schedule._id}>
              <TableCell>
                <h2>{schedule.date.slice(0, 10)}</h2>
                <p className="text-gray-300 text-xs">
                  {schedule.startTime} - {schedule.endTime}
                </p>
              </TableCell>
              <TableCell>
                <h2>{schedule?.trainer?.user?.name}</h2>
                <p className="text-gray-300 text-xs">
                  {schedule?.trainer?.user?.email}
                </p>
              </TableCell>
              <TableCell>{schedule.trainer?.specialization}</TableCell>

              <TableCell>{schedule.maxCapacity}</TableCell>
              <TableCell>{schedule.bookCount}</TableCell>
              <TableCell>
                <Button
                  color="warning"
                  className="mr-2 bg-gradient-to-tr from-neutral-900 via-gray-800 to-green-600 text-white"
                >
                  Booked
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClassSchedule;

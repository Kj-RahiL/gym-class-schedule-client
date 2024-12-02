/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {useGetScheduleByTrainerQuery } from "@/redux/features/Schedule/scheduleApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/Auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";


const ViewClass = () => {
    const token = useAppSelector(useCurrentToken);
    let user: any;
  
    if (token) {
      user = verifyToken(token);
    }
    console.log(user, 'view')
  const { data:scheduleData, isLoading, error } = useGetScheduleByTrainerQuery(user?.trainerId);
  console.log(scheduleData, 'sssssss')
  console.log(error, 'sssssss')



  if (isLoading) return <div>Loading</div>;
  if (error) return <p>Error fetching users: </p>;

  return (
    <div>
      <Table aria-label="User Management Table">
        <TableHeader>
          <TableColumn>Trainer</TableColumn>
          <TableColumn>SPECIALIZATION</TableColumn>
          <TableColumn>Date&Time</TableColumn>
          <TableColumn>Capacity</TableColumn>
          <TableColumn>BookCount</TableColumn>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewClass;

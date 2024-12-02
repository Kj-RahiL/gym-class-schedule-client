import { baseApi } from "@/redux/api/baseApi";


const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (
        scheduleData,
      ) => {
        return {
          url: "schedule/create-schedule",
          method: "POST",
          body: scheduleData,
        };
      },
      invalidatesTags:["Class"]
    }),
    getAllSchedule: builder.query({
      query: () => ({
        url: "schedule",
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),
    getIdBySchedule: builder.query({
      query: ({id}) => ({
        url: `schedule/${id}`,
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),

    getScheduleByTrainer: builder.query({
      query: (trainerId) => ({
        url: `schedule/trainer/${trainerId}`,
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),
    updateSchedule: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `schedule/${id}`,
        method: "PUT",
        body: updatedData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags:["Class"]
    }),
    deleteSchedule: builder.mutation({
      query: ({ id, token }) => ({
        url: `schedule/${id}`,
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags:["Class"]
    }),
  }),
});

export const {
 useCreateScheduleMutation,
 useGetAllScheduleQuery,
 useGetIdByScheduleQuery,
 useGetScheduleByTrainerQuery,
 useUpdateScheduleMutation,
 useDeleteScheduleMutation
} = scheduleApi;

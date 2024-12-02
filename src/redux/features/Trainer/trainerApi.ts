import { baseApi } from "@/redux/api/baseApi";


const trainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrainer: builder.mutation({
      query: (
        trainerData,
      ) => {
        return {
          url: "trainer/create-trainer",
          method: "POST",
          body: trainerData,
        };
      },
      invalidatesTags:["Class"]
    }),
    getAllTrainer: builder.query({
      query: () => ({
        url: "trainer",
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),
    getIdByTrainer: builder.query({
      query: ({id}) => ({
        url: `trainer/${id}`,
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),
    updateTrainer: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `trainer/${id}`,
        method: "PUT",
        body: updatedData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags:["Class"]
    }),
    deleteTrainer: builder.mutation({
      query: ({ id, token }) => ({
        url: `trainer/${id}`,
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
 useCreateTrainerMutation,
 useGetAllTrainerQuery,
 useGetIdByTrainerQuery,
 useUpdateTrainerMutation,
 useDeleteTrainerMutation
} = trainerApi;

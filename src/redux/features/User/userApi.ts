import { baseApi } from "@/redux/api/baseApi";


const trainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),
    getIdByUser: builder.query({
      query: ({id}) => ({
        url: `user/${id}`,
        method: "GET",
        // headers: {
        //   Authorization: ` ${token}`, 
        // },
      }),
      providesTags:["Class"]
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: updatedData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags:["Class"]
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `user/${id}`,
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
useGetAllUserQuery
} = trainerApi;

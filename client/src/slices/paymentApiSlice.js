import apiSlice from "./apiSlice";

const PAYMENT_URL = '/payment'

export const paymentApiSlice = apiSlice.injectEndpoints({
  
  endpoints:(builder) =>({

    createPayment: builder.mutation({
      query : (data) =>({
        url:`${PAYMENT_URL}/new`,
        method: "POST",
        body:data
      })
    }),

    getAllPayments: builder.query({
      query : () =>({
        url:`${PAYMENT_URL}/`,
        method: "GET",
      }),
      providesTags: ['Payment'],
      // invalidatesTags: ['Payment'],
    }),

    editPayment: builder.mutation({
      query : (data) =>({
        url:`${PAYMENT_URL}/edit`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ['Payment']
    }),



  })
})


export const { useCreatePaymentMutation, useGetAllPaymentsQuery, useEditPaymentMutation  } = paymentApiSlice;
import { User, Users } from "../../types/User";
import APIClient from "../../utils/getAPI";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (await APIClient.post<Users>(`/api/users/signin`, { email, password }))
        .data,
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await APIClient.post<Users>(`/api/users/register`, {
          name,
          email,
          password,
        })
      ).data,
  });

export const PutSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await APIClient.put<Users>(`/api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  });

export const GetUserQueryAdmin = ({ query }: { query: string }) =>
  useQuery({
    queryKey: ["Users", query],
    queryFn: async () =>
      (
        await APIClient.get<{ users: User[]; countUsers: number }>(
          `/api/users/admin/user?query=${query}`
        )
      ).data,
  });

export const GetUserIDAdmin = (userID: string) =>
  useQuery({
    queryKey: ["Users", userID],
    queryFn: async () =>
      (await APIClient.get<User>(`/api/users/admin/user/${userID}`)).data,
  });

export const PutUserAdminMutation = () =>
  useMutation({
    mutationFn: async (users: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    }) =>
      (
        await APIClient.put<{users: User}>(
          `/api/users/admin/profile/${users._id}`,
          {
            users
          }
        )
      ).data,
  });

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthContext";
import client from "../../api/base";
import toast from "react-hot-toast";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const response = await toast.promise(
      client.post("login/", {
        user_username: data.user_username,
        password: data.password,
      }),
      {
        loading: "Verificando...",
        success: "Credenciales correctas!",
        error: (error) => {
          const errorMessage =
            error.response?.data?.non_field_errors[0] ||
            "Error en la solicitud";
          return <b>{errorMessage}</b>;
        },
      }
    );

    console.log(response.data);

    login(response.data);

    navigate("/home");

    setIsLoading(false);
  });

  return (
    <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
      <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
        <p className="text-[32px] font-bold text-white text-center">Ingresar</p>
        <p className="mb-2.5 mt-2.5 font-normal text-zinc-400 text-center">
          Ingrese su correo y contraseña para ingresar!
        </p>
        <div className="relative my-4">
          <div className="relative flex items-center py-1">
            <div className="grow border-t border-zinc-800"></div>
            <div className="grow border-t border-zinc-800"></div>
          </div>
        </div>
        <div>
          <form onSubmit={onSubmit} className="mb-4">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <label className="text-white">Correo</label>
                <input
                  className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0"
                  id="username"
                  placeholder="name@example.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="Username"
                  autoCorrect="off"
                  name="username"
                  {...register("user_username", { required: true })}
                />
                {errors.user_username && (
                  <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
                    Este campo es requerido
                  </span>
                )}
                <label className="mt-2 text-white">Contraseña</label>
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 "
                  name="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <button
                className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-950 hover:bg-white/90 active:bg-white/80 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium"
                type="submit"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import client from "../../api/base";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function PermiRol() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("token");
  const [allRoles, setAllRoles] = useState([]);
  const [allPermissions, setAllPermission] = useState([]);
  const [allCatalogos, setAllCatalogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    console.log(data);

    const response = await toast.promise(
      client.post("permi_roles/", {
        role: parseInt(data.role),
      permission: parseInt(data.permission),
      entitycatalog: parseInt(data.entity),
      }),
      {
        loading: "Creando...",
        success: "Creado correctamente!",
        error: (error) => {
          const errorMessage =
            error.response?.data?.non_field_errors[0] ||
            "Error en la solicitud";
          return <b>{errorMessage}</b>;
        },
      }
    );
  });

  const getDatos = async () => {
    try {
      const response = await client.get("roles/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setAllRoles(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const getDatosPermissions = async () => {
    try {
      const response = await client.get("permi_users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setAllPermission(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const getDatosEntidades = async () => {
    try {
      const response = await client.get("entity-catalogs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setAllCatalogos(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  useEffect(() => {
    getDatos();
    getDatosPermissions();
    getDatosEntidades();
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Crear permisos de Rol
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Diligencie el formulario.
        </p>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Rol *
            </label>
            <select
              id="role"
              className="form-select w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              defaultValue=""
              required
              {...register("role", { required: true })}
            >
              <option value="" disabled>
                Seleccione un rol
              </option>
              {allRoles.map((role, index) => (
                <option key={index} value={role.id_role}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Permiso *
            </label>
            <select
              id="permission"
              className="form-select w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              defaultValue=""
              required
              {...register("permission", { required: true })}
            >
              <option value="" disabled>
                Seleccione un permiso
              </option>
              {allPermissions.map((permission, index) => (
                <option key={index} value={permission.id_peusr}>
                  {permission.permission.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Entidad *
            </label>
            <select
              id="entity"
              className="form-select w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              defaultValue=""
              required
              {...register("entity", { required: true })}
            >
              <option value="" disabled>
                Seleccione una entidad
              </option>
              {allCatalogos.map((catalogos, index) => (
                <option key={index} value={catalogos.id_entit}>
                  {catalogos.entit_name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

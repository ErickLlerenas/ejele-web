import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type Profile = {
  id: string;
  email: string;
  created_at: string;
};

type Restaurant = {
  id: string;
  owner_id: string;
  name: string;
  created_at: string;
  subscription_status: string;
  subscription_expiry?: string; // <-- Nuevo
  invoice_credits?: number; // <-- Nuevo
  facturapi_is_ready?: boolean; // <-- Nuevo
  total_orders_created?: number;
  total_products_created?: number;
  last_active_at?: string;
  app_version?: string;
};

type AdminData = {
  profiles: Profile[];
  restaurants: Restaurant[];
};

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const supabase = getSupabase();
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
        if (session) {
          fetchAdminData();
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) {
          fetchAdminData();
        }
      });

      return () => subscription.unsubscribe();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const supabase = getSupabase();
      // Llamamos al RPC que crearemos en Supabase
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "get_admin_dashboard_data",
      );

      if (rpcError) throw rpcError;
      setData(rpcData as AdminData);
    } catch (err: any) {
      setError(err.message || "Error al cargar datos. ¿Eres el admin?");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const supabase = getSupabase();
      // Usaremos Google Login igual que en la app
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/admin",
        },
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      setData(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center flex-col">
        <p className="text-red-400 mb-4">{error}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-700">
          <h1 className="text-2xl font-bold mb-2">Panel de Control</h1>
          <p className="text-gray-400 mb-8 text-sm">
            Acceso exclusivo para el administrador (dev.llerenas@gmail.com).
          </p>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ejele Admin</h1>
            <p className="text-gray-400">Hola, {session.user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors border border-gray-700 text-sm"
          >
            Cerrar sesión
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-8">
            <p className="font-semibold">Error al obtener datos</p>
            <p className="text-sm opacity-90">{error}</p>
            <p className="text-sm mt-2">
              Asegúrate de haber creado el RPC{" "}
              <code>get_admin_dashboard_data</code> en Supabase y de estar
              logueado con el correo de admin.
            </p>
          </div>
        )}

        {data && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">
                  Total Usuarios
                </h3>
                <p className="text-4xl font-bold mt-2 text-white">
                  {data.profiles.length}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">
                  Total Restaurantes
                </h3>
                <p className="text-4xl font-bold mt-2 text-blue-400">
                  {data.restaurants.length}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">
                  Total órdenes
                </h3>
                <p className="text-4xl font-bold mt-2 text-green-400">
                  {data.restaurants.reduce(
                    (acc, r) => acc + (r.total_orders_created || 0),
                    0,
                  )}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">
                  Total productos
                </h3>
                <p className="text-4xl font-bold mt-2 text-amber-400">
                  {data.restaurants.reduce(
                    (acc, r) => acc + (r.total_products_created || 0),
                    0,
                  )}
                </p>
              </div>
            </div>

            {/* Restaurants Table */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Restaurantes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-800/50 text-gray-400">
                    <tr>
                      <th className="px-6 py-4 font-medium">Nombre</th>
                      <th className="px-6 py-4 font-medium">Plan</th>
                      <th className="px-6 py-4 font-medium">Créditos</th>
                      <th className="px-6 py-4 font-medium">Facturapi</th>
                      <th className="px-6 py-4 font-medium">Órdenes</th>
                      <th className="px-6 py-4 font-medium">Productos</th>
                      <th className="px-6 py-4 font-medium">Versión App</th>
                      <th className="px-6 py-4 font-medium">
                        Última Actividad
                      </th>
                      <th className="px-6 py-4 font-medium">Fecha Creación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {data.restaurants.map((restaurant) => {
                      const isActive =
                        restaurant.last_active_at &&
                        new Date(restaurant.last_active_at).getTime() >
                          Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 días

                      return (
                        <tr
                          key={restaurant.id}
                          className="hover:bg-gray-700/20 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">
                              {restaurant.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {data.profiles.find(
                                (p) => p.id === restaurant.owner_id,
                              )?.email || "Desconocido"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative group cursor-help inline-block">
                              <span
                                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                                  restaurant.subscription_status ===
                                    "lifetime" ||
                                  restaurant.subscription_status.includes(
                                    "premium",
                                  )
                                    ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                                    : "bg-gray-700 text-gray-300 border border-gray-600"
                                }`}
                              >
                                {restaurant.subscription_status}
                              </span>
                              {restaurant.subscription_expiry && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-gray-900 text-gray-200 text-xs rounded py-1 px-2 border border-gray-700 shadow-xl z-10">
                                  Caduca:{" "}
                                  {new Date(
                                    restaurant.subscription_expiry,
                                  ).toLocaleDateString()}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-700"></div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-white">
                            {restaurant.invoice_credits || 0}
                          </td>
                          <td className="px-6 py-4">
                            {restaurant.facturapi_is_ready ? (
                              <span className="text-green-400 font-medium text-sm flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                Listo
                              </span>
                            ) : (
                              <span className="text-gray-500 text-sm">
                                No config.
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 font-medium text-white">
                            {restaurant.total_orders_created || 0}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {restaurant.total_products_created || 0}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {restaurant.app_version || "-"}
                          </td>
                          <td className="px-6 py-4">
                            {restaurant.last_active_at ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    isActive ? "bg-green-500" : "bg-gray-500"
                                  }`}
                                ></div>
                                <span
                                  className={
                                    isActive
                                      ? "text-green-400"
                                      : "text-gray-400"
                                  }
                                >
                                  {new Date(
                                    restaurant.last_active_at,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            {new Date(
                              restaurant.created_at,
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                    {data.restaurants.length === 0 && (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No hay restaurantes registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

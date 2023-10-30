import { defineStore } from "pinia";
import { apiAxios } from "@/api/apiAxios";
import { apiAxiosDll } from "@/api/apiAxiosDll";

export const useApiContabilidad = defineStore("contabilidad", {
  state: () => ({}),
  getters: {
    getMunic$() {},
  },
  actions: {
    logOut$() {
      sessionStorage.removeItem("operador");
      sessionStorage.removeItem("token");
      window.close();
    },
    autorize$({ operador = {}, loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/autorize`,
          method: "POST",
          data: {
            usu_oper: operador?.OPER?.trim(),
            id_oper: operador?.IDUSU?.trim(),
            nombre_oper: operador?.NOMUSU?.trim(),
            rol_oper: operador?.EST?.trim(),
          },
          loader,
        })
          .then((response) => {
            if (response.success) {
              sessionStorage._token = response.data.token;
              resolve(true);
            } else reject(response.message);
          })
          .catch((error) => {
            console.error(error);
            reject("Error obteniendo token");
          });
      });
    },
    getDll$({ ip = "", directorio = "", data = {}, modulo = "", espacios = false, loader = true }) {
      console.log("modulo ->", modulo);
      return new Promise((resolve, reject) => {
        apiAxiosDll({
          url: `contabilidad/dll`,
          method: "POST",
          params: { ip, directorio, espacios, modulo },
          data,
          loader,
        })
          .then((response) => resolve(response))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    getOperador$({ loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad`,
          method: "GET",
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    getCiuda$({ dpto_ciu = null, ciu_ciu = null, loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/get-ciudad`,
          method: "GET",
          params: { dpto_ciu, ciu_ciu },
          loader,
        })
          .then((response) => {
            if (response.success) resolve(response.data);
            else reject(response.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    CON008$({ nit = null, loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/CON008`,
          method: "GET",
          params: { nit },
          loader,
        })
          .then((response) => {
            if (response.success) resolve(response.data);
            else reject(response.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    CON000VerificarCopiaDelDia$({ nit = null, loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/verificar-copia`,
          method: "GET",
          loader,
        })
          .then((response) => {
            if (response.success) resolve(response.data);
            else reject(response.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    CON000Backup$({ loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/backup`,
          method: "GET",
          loader,
          responseType: "blob",
        })
          .then((response) => {
            console.log(response);
            const now = new Date();
            const year = now.getFullYear();
            const month = now.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
            const day = now.getDate();
            const fileName = `${year}-${month}-${day}-backup.sql.enc`;

            var fileURL = window.URL.createObjectURL(new Blob([response]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", fileName);
            document.body.appendChild(fileLink);
            fileLink.click();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    _getLogo$({ disco = "D", nit = 0, formato = "png" }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/get-logo`,
          method: "GET",
          params: { disco, nit, formato },
          loader: true,
        })
          .then((response) => {
            if (response.success) resolve(response.data);
            else {
              resolve(
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              );
            }
          })
          .catch((error) => {
            console.error(error);
            reject(`Error consultando logo de nit ${nit}`);
          });
      });
    },
  },
});

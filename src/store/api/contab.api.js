import { defineStore } from "pinia";
import { apiAxios } from "@/api/apiAxios";
import { apiAxiosDll } from "@/api/apiAxiosDll";
import { regEncabezado } from "@/fuentes";
import { useModuleFormatos } from "@/store";

export const useApiContabilidad = defineStore("contabilidad", {
  state: () => ({
    empresa: useModuleFormatos().getEmpresa,
    encabezado: regEncabezado(),
  }),
  getters: {
    getEncabezado() {
      if (this.encabezado.codigo) return this.encabezado;
      else if (sessionStorage.encabezado) return JSON.parse(sessionStorage.encabezado);
    },
    getImgBs64: () =>
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  },
  actions: {
    logOut$() {
      sessionStorage.removeItem("operador");
      sessionStorage.removeItem("token");
      window.close();
    },
    setHeader$({ encabezado }) {
      sessionStorage.removeItem("encabezado");
      if (encabezado) {
        this.encabezado = encabezado;
        sessionStorage.setItem("encabezado", JSON.stringify(encabezado));
      }
    },
    getDll$({ data = {}, modulo = "", espacios = false, loader = true }) {
      return new Promise((resolve, reject) => {
        apiAxiosDll({
          url: `contabilidad/dll`,
          method: "POST",
          params: {
            directorio: `${process.env.APP}/${modulo}`,
            ip: localStorage.ip,
            espacios,
          },
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
    enviarCorreo$({ file = null, subject = "", cuerpo = "", destino = "", loader = true }) {
      const formData = new FormData();
      formData.append("archivo", file, "consentimiento.pdf");

      const data_correo = {
        server_email: "smtp.gmail.com",
        remitente: this.empresa.emailusu.toLowerCase(),
        clave: this.empresa.clave_email.toLowerCase(),
        puerto: 587,
        destino,
        subject,
        cuerpo,
      };

      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/enviar-correo`,
          method: "POST",
          data: formData,
          params: data_correo,
          loader,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => resolve(response))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    guardarFile$({ base64 = "", ruta = "", codigo = "", formato = "png", loader = true }) {
      if (this.empresa.unid_prog == "S") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/SC/newcobol/DATOS/FIRMAS_CONSEN`;
      } else if (this.empresa.unid_prog == "P") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/PSC/PROG/DATOS/FIRMAS_CONSEN`;
      }

      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/guardar-file`,
          method: "POST",
          data: { base64, ruta: `${ruta}/${codigo}.${formato}` },
          loader,
        })
          .then((response) => resolve(response))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    _getLogo$({ nit = 0, formato = "png" }) {
      nit = Number(this.empresa.nitusu);
      let ruta;
      if (this.empresa.unid_prog == "S") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/SC/newcobol/LOGOS`;
      } else if (this.empresa.unid_prog == "P") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/PSC/PROG/LOGOS`;
      }
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/get-imagen`,
          method: "GET",
          params: { ruta, codigo: nit, formato },
          loader: true,
        })
          .then((response) => {
            if (response.success) resolve(response.data);
            else {
              resolve(
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              );
            }
          })
          .catch((error) => {
            console.error(error);
            reject(`Error consultando logo de nit ${nit}`);
          });
      });
    },
    _getFirma$({ disco = "D", codigo = 0, formato = "png", programa = "PSC" }) {
      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/get-firma`,
          method: "GET",
          params: { disco, codigo, formato, programa },
          loader: true,
        })
          .then((response) => {
            if (response.success) resolve(`data:image/png;base64,${response.data}`);
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
    _getHuella$({ codigo = 0, formato = "png" }) {
      let ruta;
      if (this.empresa.unid_prog == "S") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/SC/newcobol/DATOS/BIOMETRIA`;
        formato = "bin";
      } else if (this.empresa.unid_prog == "P") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/PSC/PROG/DATOS/BIOMETRIA`;
      }

      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/get-imagen`,
          method: "GET",
          params: { ruta, codigo, formato },
          loader: true,
        })
          .then((response) => {
            if (response.success) resolve(`data:image/png;base64,${response.data}`);
            else resolve("");
          })
          .catch((error) => {
            console.error(error);
            reject(`Error consultando logo de nit ${nit}`);
          });
      });
    },
    _getImagen$({ codigo = 0, formato = "png" }) {
      let ruta;
      if (this.empresa.unid_prog == "S") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/SC/newcobol/DATOS/FIRMAS_CONSEN`;
      } else if (this.empresa.unid_prog == "P") {
        ruta = `${validarDiscoDeploy(this.empresa.nitusu)}:/PSC/PROG/DATOS/FIRMAS_CONSEN`;
      }

      return new Promise((resolve, reject) => {
        apiAxios({
          url: `contabilidad/get-imagen`,
          method: "GET",
          params: { ruta, codigo, formato },
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

const validarDiscoDeploy = (nitusu) => {
  if ([844003225].includes(Number(nitusu))) {
    return "E";
  } else return "D";
};

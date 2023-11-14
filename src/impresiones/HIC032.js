import { evaluarParentesco } from "@/formatos/utils";
import dayjs from "dayjs";

export const impresionHC032 = ({ datos }) => {
  console.log("⚡  file: HIC032.js:5  datos-->", datos);
  var dd = {
    stack: [contenidoConsenGeneral(), firmas()],
  };

  function llenarFirmador() {
    const acomp = datos.acomp.cod.length;

    return {
      ciudad: () => (acomp ? datos.acomp.descrip_ciudad : datos.paciente.descrip_ciudad),
      descrip: () => (acomp ? datos.acomp.descrip : datos.paciente.descrip),
      cod: () => (acomp ? datos.acomp.cod : datos.paciente.cod),
      acudiente: () => (acomp ? datos.paciente.descrip : ""),
    };
  }

  function contenidoConsenGeneral() {
    return {
      stack: [
        {
          text: `Historia clínica número: ${datos.llave.slice(0, 2)}-${datos.llave.slice(2)}`,
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          columns: [
            {
              width: "auto",
              text: `Ciudad: ${datos.empresa.CIUDAD_USUAR}`,
              alignment: "justify",
              style: "bodyNoBold",
            },
            {
              marginLeft: 50,
              width: "auto",
              text: `Fecha: ${dayjs(datos.empresa.FECHA_ACT).format("YYYY-MM-DD")}`,
              alignment: "justify",
              style: "bodyNoBold",
            },
          ],
        },
        {
          marginTop: 5,
          text: `Yo, ${llenarFirmador().descrip()}, identificado (a) con cédula número ${llenarFirmador().cod()} expedida en ${llenarFirmador().ciudad()} actuando en nombre propio o como acudiente de ${llenarFirmador().acudiente()}.`,
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          marginTop: 8,
          text: `Comprendo que durante el procedimiento pueden aparecer circunstancias imprevisibles o inesperadas, que pueden requerir una extensión de otro procedimiento; acepto que las ciencias de la salud no son una ciencia exacta, que se garantizan resultados en la atención, y que aunque son procedimientos seguros pueden presentarse complicaciones como:`,
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          marginLeft: 20,
          marginTop: 5,
          marginBottom: 5,
          text: `${datos.complicaciones}`,
          style: "bodyNoBold",
        },
        {
          marginTop: 3,
          text: "Me han explicado también que de negarme a realizarme los exámenes diagnósticos, procedimientos y/o tratamientos ordenados, estoy asumiendo la responsabilidad por sus consecuencias, con lo que exonero de ellas el quipo asistencial tratante y la institución, sin embargo ello no significa que pierda mis derechos para una atención posterior.",
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          marginTop: 10,
          text: "Se me ha informado que en la ESE salud Yopal, cuenta con personal idóneo, competente y capacitado para la determinación de conductas terapéuticas que contribuyan a mejorar mi calidad de vida y salud. Doy constancia de que se me ha explicado en lenguaje sencillo claro, y entendible para mí, los aspectos relacionados con mi condición actual, los riesgos y beneficios de los procedimientos; se me ha permitido hacer todas las preguntas necesarias, y han sido resueltas satisfactoriamente.",
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          marginTop: 10,
          marginBottom: 8,
          text: "Por lo tanto, en forma consciente y voluntaria, sin haber sido objeto de coacción, persuasión, ni manipulación:",
          alignment: "justify",
          style: "bodyNoBold",
        },
        autorizoCheck(),
      ],
    };
  }

  function autorizoCheck() {
    if (datos.autorizo) {
      return {
        marginTop: 10,
        layout: "noBorders",
        table: {
          widths: ["2%", "98%"],
          body: [
            [
              {
                stack: cuadro_canvas(true),
              },
              {
                text: [
                  {
                    text: "Autorizo",
                    bold: true,
                    decoration: "underline",
                  },
                  {
                    text: `al personal asistencial de la ESE Salud Yopal, para la realización de los procedimientos de salud: ${datos.procedimiento}, cuyo objetivo es: ${datos.objetivo}, ante el diagnostico ${datos.diagnostico}`,
                  },
                ],
                alignment: "justify",
                style: "bodyNoBold",
              },
            ],
            [{}, {}],
          ],
        },
      };
    } else {
      return {
        layout: "noBorders",
        table: {
          widths: ["2%", "98%"],
          body: [
            [
              {
                stack: cuadro_canvas(true),
              },
              {
                text: [
                  {
                    text: "Expreso mi voluntad de ",
                  },
                  {
                    text: "revocar",
                    bold: true,
                    decoration: "underline",
                  },
                  {
                    text: ` el consentimiento presentado y declaro por tanto que, tras la información recibida, no consiento someterme al procedimiento de: GENERAL PYP OK \npor los siguientes motivos: ${datos.revocar_motivos}`,
                  },
                ],
                alignment: "justify",
                style: "bodyNoBold",
              },
            ],
            [
              {
                marginTop: -2,
                colSpan: 2,
                text: "",
                alignment: "justify",
                style: "bodyNoBold",
              },
              {},
            ],
          ],
        },
      };
    }
  }

  function cuadro_canvas(condicion) {
    return [
      { canvas: [{ type: "rect", x: 0, y: 0, h: 11, w: 12 }] },
      {
        canvas: condicion
          ? [
              { type: "line", x1: 0, x2: 12, y1: -11, y2: 0 },
              { type: "line", x1: 12, x2: 0, y1: -11, y2: 0 },
            ]
          : [],
      },
    ];
  }

  function firmaPaciente() {
    return {
      stack: [
        {
          text: "PACIENTE (FIRMA / HUELLA)",
          bold: true,
          alignment: "center",
          style: "tableNoBold",
        },
        {
          columns: [
            {
              marginTop: 9,
              alignment: "center",
              image: "firma_paci",
              width: 105,
              height: 70,
            },
            {
              marginTop: 9,
              marginLeft: 8,
              image: "firma_paci",
              width: 55,
              height: 70,
            },
          ],
        },
        {
          marginTop: 10,
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "NOMBRE: ",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${datos.paciente.descrip}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "DOCUMENTO: ",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${datos.paciente.cod}`,
            },
          ],
        },
      ],
    };
  }

  function firmaAcompanante() {
    return {
      stack: [
        {
          text: "TUTOR O ACOMPAÑANTE (FIRMA / HUELLA)",

          alignment: "center",
          style: "tableNoBold",
          bold: true,
        },
        {
          text: "(EN CASO DE NO FIRMAR)",
          alignment: "center",
          style: "tableNoBold",
          fontSize: 6,
        },
        {
          marginLeft: 3,
          columns: [
            {
              marginTop: 9,
              alignment: "center",
              image: "firma_acomp",
              width: 105,
              height: 70,
            },
            {
              marginTop: 9,
              marginLeft: 8,
              image: "firma_acomp",
              width: 55,
              height: 70,
            },
          ],
        },
        {
          marginTop: 10,
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "NOMBRE: ",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${datos.acomp.descrip}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "DOCUMENTO: ",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${datos.acomp.cod}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "PARENTESCO: ",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${evaluarParentesco(datos.paren_acomp)}`,
            },
          ],
        },
      ],
    };
  }

  function firmaProfesional() {
    return {
      stack: [
        {
          text: "FIRMA PROFESIONAL",

          alignment: "center",
          style: "tableNoBold",
          bold: true,
        },
        {
          marginTop: 8,
          alignment: "center",
          image: "firma_profesional",
          width: 130,
          height: 70,
        },
        {
          marginTop: 8,
          text: [
            {
              text: "NOMBRE: ",
              style: "tableNoBold",
              bold: true,
            },
            {
              text: `${datos.prof.descrip}`,
              style: "tableNoBold",
            },
          ],
        },
        {
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "PROFESIONAL AREA DE:",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${datos.prof.descrip_atiende}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "auto",
              style: "tableNoBold",
              text: "DOCUMENTO: ",
              bold: true,
            },
            {
              marginLeft: 5,
              style: "tableNoBold",
              text: `${datos.prof.cod}`,
            },
          ],
        },
      ],
    };
  }

  function firmas(condicion) {
    let firmasArray = [];
    let anchos = [];

    if (datos.firmas.firma_paci) {
      firmasArray.push(firmaPaciente());
    }

    if (datos.firmas.firma_acomp) {
      firmasArray.push(firmaAcompanante());
    }

    if (datos.firmas.firma_prof) {
      firmasArray.push(firmaProfesional());
    }

    if (firmasArray.length == 2) {
      firmasArray.unshift({ border: [false, false, false, false], text: "" });
      anchos = ["10%", "40%", "40%"];
    } else if (firmasArray.length == 3) anchos = ["33%", "34%", "33%"];
    return {
      marginTop: 30,
      table: {
        widths: anchos,
        body: [[...firmasArray]],
      },
    };
  }
  return dd;
};

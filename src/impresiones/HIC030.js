import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useApiContabilidad, useModuleFormatos } from "../store";

const { getImgBs64 } = useApiContabilidad();
const { getProf, getPaci } = useModuleFormatos();

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const impresionHC030 = ({ datos }) => {
  console.log("⚡  datos-- >", datos);
  var dd = {
    stack: [contenidoCitologia(), firmas(datos.acomp.cod ? "N" : "S")],
  };

  function contenidoCitologia() {
    return {
      stack: [
        {
          text: `Historia clínica número: ${datos.llave}`,
          alignment: "justify",
          style: "bodyNoBold",
          marginTop: 10,
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
              marginBottom: 10,
              width: "auto",
              text: `Fecha: ${datos.empresa.FECHA_ACT}`,
              alignment: "justify",
              style: "bodyNoBold",
            },
          ],
        },
        {
          text: `Yo, ${datos.paciente.descrip} numero ${datos.paciente.cod} expedida en ${datos.paciente.descrip_ciudad} actuando en nombre propio.`,
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          marginTop: 8,
          text: "Comprendo que durante el procedimiento pueden aparecer circunstancias imprevisibles o inesperadas, que pueden requerir una extensión de otro procedimiento; acepto que las ciencias de la salud no son una ciencia exacta, que se garantizan resultados en la atención, y que, aunque son procedimientos seguros pueden presentarse complicaciones como:",
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          marginLeft: 20,
          marginTop: 5,
          marginBottom: 10,
          ul: ["SANGRADO.", "DOLOR.", "PELLIZCOS."],
          style: "bodyNoBold",
        },
        {
          text: `${datos.complicaciones}`,
          // canvas: [{ type: "line", x1: 0, y1: 0, x2: 545, y2: 0, lineWidth: 1.2, lineColor: "gray" }],
        },
        {
          marginTop: 10,
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
          marginBottom: 10,
          text: "Por lo tanto, en forma consciente y voluntaria, sin haber sido objeto de coacción, persuasión, ni manipulación:",
          alignment: "justify",
          style: "bodyNoBold",
        },
        {
          layout: "noBorders",
          table: {
            widths: ["2%", "98%"],
            body: [
              [
                {
                  stack: cuadro_canvas(datos.autorizo ? true : false),
                },
                {
                  text: [
                    {
                      text: "Autorizo",
                      bold: true,
                      decoration: "underline",
                    },
                    {
                      text: " al personal asistencial de la ESE Salud Yopal, para la realización de los procedimientos de salud:",
                    },
                  ],
                  alignment: "justify",
                  style: "bodyNoBold",
                },
              ],
              [
                {
                  marginBottom: 10,
                  marginTop: -2,
                  colSpan: 2,
                  text: "TOMA DE CITOLOGIA CERVICOVAGINAL, cuyo objetivo es: DETECCION TEMPRANA DE CANCER DE CERVIX, ante el diagnostico",
                  alignment: "justify",
                  style: "bodyNoBold",
                },
                {},
              ],
            ],
          },
        },
        {
          layout: "noBorders",
          table: {
            widths: ["2%", "98%"],
            body: [
              [
                {
                  stack: cuadro_canvas(datos.autorizo ? false : true),
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
                      text: " el consentimiento presentado y declaro por tanto que, tras la información recibida, no consiento someterme al procedimiento de: BLABLABLA \npor los siguientes motivos: MOTIVOS",
                    },
                  ],
                  alignment: "justify",
                  style: "bodyNoBold",
                },
              ],
              [
                {
                  marginTop: -2,
                  marginBottom: 10,
                  colSpan: 2,
                  text: "",
                  alignment: "justify",
                  style: "bodyNoBold",
                },
                {},
              ],
            ],
          },
        },
        {
          style: "tableNoBold",
          alignment: "justify",
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                {
                  text: [
                    {
                      text: "FECHA DE ULTIMA CITOLOGIA CEVIOVAGINAL: ",
                    },
                    {
                      text: `${datos.fecha_ult_cito}`,
                    },
                  ],
                },
                {
                  text: `ANTECEDENTES GINECOLOGICOS: ${datos.antec_gineco}`,
                },
              ],
              [
                {
                  colSpan: 2,
                  stack: [
                    {
                      text: `Telefono 1: ${datos.telefono1}`,
                    },
                    {
                      text: `Telefono 2: ${datos.telefono2}`,
                    },
                  ],
                },
                {},
              ],
            ],
          },
        },
      ],
    };
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
          pageBreak: "before",
        },
        {
          marginTop: 9,
          alignment: "center",
          image: "firma_paci",
          width: 130,
          height: 70,
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
          pageBreak: "before",
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
          marginTop: 2,
          alignment: "center",
          image: "firma_acomp",
          width: 130,
          height: 70,
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
              text: "HERMANO",
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
          pageBreak: "before",
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
        firmasArray.unshift({border: [false, false, false, false] ,text:""});
        // margenIzq = 100;
        anchos = ["10%","40%", "40%"];
    }
    else if (firmasArray.length == 3) anchos = ["33%", "34%","33%"];
    return {
      table: {
        widths: anchos,
        body: [
            [
            ...firmasArray
            ]
        ],
      },
    };
  }

  return dd;
};

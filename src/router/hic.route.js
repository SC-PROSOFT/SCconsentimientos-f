export const createRouteHic = (title) => [
  {
    path: "/HIC001",
    name: "HIC001",
    component: () => import("@/views/hic/HIC001.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC001`,
      descrip: "CONSENTIMIENTO INFORMADO PARA LA PRUEBA DE VIH (Prueba de Inmunodeficiencia Humana)",
    },
  },
  {
    path: "/HIC002",
    name: "HIC002",
    component: () => import("@/views/hic/HIC002.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC002`,
      descrip: "Consentimiento informado retiro voluntario",
    },
  },
  {
    path: "/HIC003",
    name: "HIC003",
    component: () => import("@/views/hic/HIC003.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC003`,
      descrip: "Consentimiento informado procedimientos invasivos",
    },
  },
  {
    path: "/HIC006",
    name: "HIC006",
    component: () => import("@/views/hic/HIC006.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC006`,
      descrip:
        "Consentimiento del familiar o tutor, autorizando a hija menor para vacunarse contra el virus del papiloma humano",
    },
  },
  {
    path: "/HIC008",
    name: "HIC008",
    component: () => import("@/views/hic/HIC008.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC008`,
      descrip: "Formato de constancia de servicios recibidos",
    },
  },
  {
    path: "/HIC030",
    name: "HIC030",
    component: () => import("@/views/hic/HIC030.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC030`,
      descrip: "Consentimiento informado para la toma de citología."
    },
  },
  {
    path: "/HIC031",
    name: "HIC031",
    component: () => import("@/views/hic/HIC031.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC031`,
      descrip: "Colposcopía",
    },
  },
  {
    path: "/HIC032",
    name: "HIC032",
    component: () => import("@/views/hic/HIC032.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC032`,
      descrip: "Consentimiento informado general para promoción y prevención (PYP).",
    },
  },
  {
    path: "/HIC033",
    name: "HIC033",
    component: () => import("@/views/hic/HIC033.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC033`,
      descrip: "PRUEBA VIH",
    },
  },
  {
    path: "/HIC034",
    name: "HIC034",
    component: () => import("@/views/hic/HIC034.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC034`,
      descrip: "Interrupción voluntaria del embarazo",
    },
  },
  {
    path: "/HIC035",
    name: "HIC035",
    component: () => import("@/views/hic/HIC035.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC035`,
      descrip: "Eventos de interés en salud pública (EISP)",
    },
  },
  {
    path: "/HIC036",
    name: "HIC036",
    component: () => import("@/views/hic/HIC036.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC036`,
      descrip: "Tratamiento directamente observado (TDO)",
    },
  },
  {
    path: "/HIC037",
    name: "HIC037",
    component: () => import("@/views/hic/HIC037.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC037`,
      descrip: "Pruebas radiológicas en pacientes en estado o sospecha de gestación",
    },
  },
  {
    path: "/HIC038",
    name: "HIC038",
    component: () => import("@/views/hic/HIC038.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC038`,
      descrip: "Referencia y contrarreferencia OK",
    },
  },
  {
    path: "/HIC039",
    name: "HIC039",
    component: () => import("@/views/hic/HIC039.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC039`,
      descrip: "Salida voluntaria",
    },
  },
  {
    path: "/HIC040",
    name: "HIC040",
    component: () => import("@/views/hic/HIC040.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC040`,
      descrip: "Atencion de parto",
    },
  },
  {
    path: "/HIC041",
    name: "HIC041",
    component: () => import("@/views/hic/HIC041.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC041`,
      descrip: "Ingreso urgencias",
    },
  },
  {
    path: "/HIC042",
    name: "HIC042",
    component: () => import("@/views/hic/HIC042.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC042`,
      descrip: "Aplicación de la vacuna contra el virus del papiloma humano - VPH",
    },
  },
  {
    path: "/ODO003",
    name: "ODO003",
    component: () => import("@/views/odo/ODO003.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC042`,
      descrip: "Consentimiento informado para odontología",
    },
  },
];

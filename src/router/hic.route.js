export const createRouteHic = (title) => [
  {
    path: "/HIC024",
    name: "HIC024",
    component: () => import("@/views/hic/HIC24.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC24`,
    },
  },
  {
    path: "/HIC030",
    name: "HIC030",
    component: () => import("@/views/hic/HIC030.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC030`,
    },
  },
  {
    path: "/HIC032",
    name: "HIC032",
    component: () => import("@/views/hic/HIC032.vue"),
    meta: {
      require_auth: true,
      title: `${title} - FORMATO HIC032`,
    },
  },
];

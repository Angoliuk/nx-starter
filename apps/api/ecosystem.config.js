module.exports = [
  {
    autorestart: true,
    max_memory_restart: "1G",
    name: "api",
    script: "pnpm nx serve api",
  },
];

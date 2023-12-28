module.exports = [
  {
    autorestart: true,
    max_memory_restart: "1G",
    name: "web",
    script: "pnpm nx serve web",
  },
];

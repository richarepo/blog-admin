module.exports={
  apps : [
    {
      name      : "repozitory-blog-admin-frontend",
      script    : "npm",
      interpreter: "none",
      args: "start",
      env: {
	PORT: 3003,
	NODE_ENV: "production"
      }
    }
  ]
}

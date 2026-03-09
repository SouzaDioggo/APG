module.exports = {
  apps: [
    {
      name: 'apg-blog',
      script: '.next/standalone/server.js',
      node_args: '--max-old-space-size=512',
      env: {
        NODE_ENV: 'production',
        PORT: 3301,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '512M',
      watch: false,
      ignore_watch: [
        'node_modules',
        '.next',
        'logs',
        '.git'
      ],
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};
